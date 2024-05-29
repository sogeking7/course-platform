"use client";

import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { fileSchema } from "@/types";
import Image from "next/image";
import Cropper, { Area } from "react-easy-crop";
import { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface cropAndOriginalImage {
  crop: string;
  original: HTMLImageElement;
}

export const UserPictureForm = () => {
  const { data: session, update, loading } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  const [modal, setModal] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [crop, setCrop] = useState<crop>({
    x: 0,
    y: 0,
    width: 500,
    height: 500,
  });
  const [cropFinal, setCropFinal] = useState<crop>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [zoom, setZoom] = useState<number>(1.0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageObj, setImageObj] = useState<cropAndOriginalImage>(
    {} as cropAndOriginalImage,
  );

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = register("file");

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      userStore.uploadPhoto(user?.id!, formData),
    onSuccess: (newUserData) => {
      update(newUserData);
      reset(getValues());
    },
  });

  const onSubmit = (data: z.infer<typeof fileSchema>) => {
    const formData = new FormData();
    const file = data.file[0];
    formData.append("file", file);
    // mutation.mutate(formData);

    setZoom(1.0);
    setCrop({ x: 0, y: 0, width: 500, height: 500 });
    var reader = new FileReader();
    reader.onload = function (e: any) {
      setImageSrc(e.target.result);
    };
    setModal(true);
    reader.readAsDataURL(file);
  };

  const hendleZoom = (event: React.FormEvent<HTMLInputElement>) => {
    setZoom(parseFloat(parseFloat(event.currentTarget.value).toFixed(1)));
  };
  const increment = () => {
    setZoom((zoom) =>
      parseFloat((parseFloat(zoom.toFixed(1)) + 0.1).toFixed(1)),
    );
  };
  const decrement = () => {
    setZoom((zoom) =>
      parseFloat((parseFloat(zoom.toFixed(1)) - 0.1).toFixed(1)),
    );
  };

  const onCropChange = useCallback((crop: crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCropFinal(croppedAreaPixels);
    },
    [],
  );

  const getCroppedImg = async () => {
    setLoading(true);
    let { crop, original }: cropAndOriginalImage = await new Promise(
      async (resolve) => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");

        canvas.width = cropFinal.width;
        canvas.height = cropFinal.height;

        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

        var img: HTMLImageElement = document.createElement("img");

        img.src = imageSrc || "";

        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = cropFinal.width * pixelRatio;
        canvas.height = cropFinal.height * pixelRatio;
        ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        // ctx?.imageSmoothingQuality && ctx.imageSmoothingQuality = "high";
        ctx?.drawImage(
          img,
          cropFinal.x,
          cropFinal.y,
          cropFinal.width,
          cropFinal.height,
          0,
          0,
          cropFinal.width,
          cropFinal.height,
        );

        let canvasData: string = await new Promise((resolve) => {
          canvas.toBlob((file: any) => {
            resolve(URL.createObjectURL(file));
          }, "image/jpeg");
        });

        resolve({ crop: canvasData, original: img });
      },
    );
    setImageObj({ original, crop });
    setIsModalOpen(true);
    setLoading(false);
  };

  const onCancel = () => {
    setImageSrc(null);
    setZoom(1.0);
    setCrop({ x: 0, y: 0, width: 500, height: 500 });
  };

  if (status === "loading") {
    return <div className="p-5 bg-white border rounded-sm">Жүктелуде...</div>;
  }

  return (
    <div className="p-5 bg-white border rounded-sm mb-6">
      {/* <Image
        width={150}
        height={150}
        className="w-[150px] h-[150px] rounded-full mb-6"
        src={userData.profilePictureLink || ""}
        alt="User Profile Image"
      /> */}
      <Dialog open={modal} onOpenChange={(v) => setModal(!v)}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="h-full p-0 bg-white">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <div className="p-5">
                <div className="relative w-full aspect-square">
                  {/* @ts-ignore */}
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={0}
                    zoom={zoom}
                    aspect={4 / 4}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {!imageSrc ? <p>No image</p> : <></>}

      {imageSrc && (
        <>
          <div className="flex items-center space-x-2" id="image">
            <button
              onClick={decrement}
              className="px-1 text-gray-600 disabled:text-gray-400"
              disabled={zoom <= 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H6"
                />
              </svg>
            </button>

            <input
              onChange={hendleZoom}
              className="w-full"
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
            />

            <button
              onClick={increment}
              className="px-1 text-gray-600 disabled:text-gray-400"
              disabled={zoom >= 3}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </button>
          </div>
          <div className="space-x-3 mt-4 flex justify-center items-center">
            <button
              onClick={onCancel}
              className="border border-gray-700 rounded-md px-4 py-1.5 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-75"
            >
              Anuluj
            </button>
            <button
              onClick={getCroppedImg}
              disabled={cropFinal.width <= 0 && cropFinal.height <= 0}
              className="border border-orange-600 bg-orange-600 rounded-md px-4 py-1.5 text-white hover:bg-orange-700 transition-colors duration-75 inline-flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`animate-spin ${isLoading ? "inline-block" : "hidden"}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 3a9 9 0 1 0 9 9"></path>
              </svg>
              <span>Zapisz zmiany</span>
            </button>
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 items-center"
      >
        <div>
          <Input
            className="py-2 !text-sm !leading-none w-[250px]"
            type="file"
            {...fileRef}
          />
          {errors.file && (
            <span className="text-xs text-destructive">
              {errors.file.message}
            </span>
          )}
        </div>
        <Button disabled={!isDirty || !isValid} type="submit">
          {mutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Сақтау
        </Button>
      </form>
    </div>
  );
};
