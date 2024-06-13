"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Minus, Plus } from "lucide-react";
import { z } from "zod";
import { fileSchema } from "@/types";
import Image from "next/image";
import Cropper, { Area } from "react-easy-crop";
import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

interface PictureFormProps {
  uploadPhoto: (id: number, data: FormData) => Promise<any>;
  entityData: {
    id: number;
    profilePictureLink?: string; // For user
    coursePictureLink?: string; // For course
  };
  aspect: number;
  cropShape: string;
  entityType: "user" | "course";
  onSuccess?: (data: any) => void;
}

export const PictureForm = ({
  uploadPhoto,
  entityData,
  entityType,
  onSuccess,
  aspect,
  cropShape,
}: PictureFormProps) => {
  const [modal, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>("");
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
  const [imageObj, setImageObj] = useState<{
    formData: FormData;
    url: string;
  } | null>(null);

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
    mutationFn: (formData: FormData) => uploadPhoto(entityData.id, formData),
    onSuccess: (newData) => {
      reset(getValues());
      reset();
      onCancel();
      if (onSuccess) {
        onSuccess(newData);
      }
    },
  });

  const onSubmit = (data: z.infer<typeof fileSchema>) => {
    const formData = new FormData();
    const file = data.file[0];
    formData.append("file", file);

    setZoom(1.0);
    setCrop({ x: 0, y: 0, width: 500, height: 500 });
    var reader = new FileReader();
    reader.onload = function (e: any) {
      setImageSrc(e.target.result);
    };
    setModal(true);
    reader.readAsDataURL(file);
  };

  const onSave = () => {
    if (!imageObj) return;
    mutation.mutate(imageObj.formData);
  };

  const handleZoom = (event: React.FormEvent<HTMLInputElement>) => {
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
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    canvas.width = cropFinal.width;
    canvas.height = cropFinal.height;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    var img: HTMLImageElement = document.createElement("img");

    img.src = imageSrc || "";

    const pixelRatio = window.devicePixelRatio;
    canvas.width = cropFinal.width * pixelRatio;
    canvas.height = cropFinal.height * pixelRatio;
    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
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

    canvas.toBlob((file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      setImageObj({ formData: formData, url: URL.createObjectURL(file) });
    }, "image/jpeg");
  };

  const onCancel = () => {
    setModal(false);
    setImageSrc(null);
    setZoom(1.0);
    setImageObj(null);
    setCrop({ x: 0, y: 0, width: 500, height: 500 });
  };

  return (
    <div>
      <Dialog open={modal} onOpenChange={(v) => setModal(!v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Фотоны жүктеу</DialogTitle>
          </DialogHeader>
          {imageObj ? (
            // <div className={`aspect-[${aspect}]`}>
            <img
              className={cn(
                cropShape === "round" ? "rounded-full " : "",
                "w-full h-full border",
              )}
              src={imageObj.url}
              loading="lazy"
              alt="cropped-image"
            />
          ) : (
            // </div>
            <>
              <div className="relative w-full max-h-[500px] aspect-square">
                {/* @ts-ignore */}
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={0}
                  zoom={zoom}
                  aspect={aspect}
                  cropShape={cropShape}
                  showGrid={false}
                  onCropChange={onCropChange}
                  onCropComplete={onCropComplete}
                  onZoomChange={onZoomChange}
                />
              </div>
              <div className="mt-2 flex items-center space-x-2" id="image">
                <Button
                  onClick={decrement}
                  size={"icon"}
                  variant={"ghost"}
                  className="min-w-10 px-1 text-gray-600 disabled:text-gray-400"
                  disabled={zoom <= 1}
                >
                  <Minus />
                </Button>
                <input
                  onChange={handleZoom}
                  className="w-full"
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                />
                <Button
                  onClick={increment}
                  variant={"ghost"}
                  size={"icon"}
                  className="min-w-10 px-1 text-gray-600 disabled:text-gray-400"
                  disabled={zoom >= 3}
                >
                  <Plus />
                </Button>
              </div>
            </>
          )}
          <DialogFooter className="flex w-full items-center">
            <Button variant={"outline"} onClick={onCancel}>
              Болдырмау
            </Button>
            {imageObj ? (
              <Button onClick={onSave}>Сақтау</Button>
            ) : (
              <Button
                onClick={getCroppedImg}
                disabled={cropFinal.width <= 0 && cropFinal.height <= 0}
              >
                Қию
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 items-center justify-center flex-col"
      >
        {cropShape === "round" ? (
          <>
            <Image
              unoptimized
              width={160}
              height={160}
              className="w-[160px] border border-[#1f2d5a] h-[160px] rounded-full"
              alt="profile-picture"
              src={
                entityType === "user"
                  ? entityData.profilePictureLink || "/placeholder.jpg"
                  : entityData.coursePictureLink || "/placeholder-course.png"
              }
            />
          </>
        ) : (
          <div className="min-w-[240px] max-w-[300px] ">
            <img
              className={cn(
                cropShape === "round" ? "rounded-full " : "",
                "w-full h-full border rounded-2xl",
              )}
              src={
                entityType === "user"
                  ? entityData.profilePictureLink || "/placeholder.jpg"
                  : entityData.coursePictureLink || "/placeholder-course.png"
              }
              loading="lazy"
              alt="cropped-image"
            />
          </div>
        )}
        <div>
          <Input
            className="py-2 !text-sm !leading-none w-[250px]"
            type="file"
            {...fileRef}
          />
          {errors.file && (
            <span className="text-xs text-destructive">
              {/* @ts-ignore */}
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
