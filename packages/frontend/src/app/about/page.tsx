import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import logo from "@/../public/shoqan-edu.svg";
import { MyContainer } from "@/components/container";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Біз туралы",
};

export default function NotFound() {
  return (
    <div className="w-full min-h-screen pt-[calc(56px)] ">
      <header className="absolute top-0 h-[56px] border-b border-neutral-300 w-full shadow-sm bg-white">
        <div className="max-w-[1248px] h-full flex items-center mx-auto px-4 md:px-6">
          <div className="w-[120px] md:w-[140px]">
            <Link href="/" className="w-[120px] md:w-[140px]">
              <Image
                alt="Logo"
                src={logo}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          </div>
        </div>
      </header>
      <MyContainer>
        <h1 className="text-slate-900 tracking-[0.015em] mb-6 lg:mb-6 scroll-m-20 text-2xl md:text-2xl font-semibold text-center lg:text-3xl">
          Біз туралы
        </h1>
        <div>
          <p className="text-base">
            Shoqan-edu.kz-тек қана еліміздің емес,әлем бойынша ең үздік
            мектептерге түсуге арналған керемет дайындық үлгісін ұсынады!🌍📚
          </p>
          <br />
          <p className="text-base">
            🌟Біздің тәжірибелі ұстаздарымыздың өзіндік дара оқыту
            технологиясымен оқушыларға тек емтиханнан өтуге ғана емес,сонымен
            қатар әр баланың табиға талантын ашуға күш салады. Бірге біріксек,өз
            жолымызды қызықты әрі жемісті етеміз!
          </p>
          <br />
          <p className="text-base">
            💡Ал ата-аналардан біз сабырлы,әрі бізге сенімді болуын
            сұраймыз,себебі сіздердің балаларыңызға болашаққа деген сапалы білім
            жолына есіктер ашылды!
          </p>
          <br />
          <p className="text-base">
            👩‍🎓Оқушыларға:Shoqan.kz-мен бірге әр тапсырма-ол одан да күшті әрі
            ақылдырақ болуға тапсырмас мүмкіндік! Біздің қызықты оқу сапарымызға
            дәл қазір қосылыңыз!💡
          </p>
          <br />
          <p className="text-base">
            🚀Өзіңіздің мақсатыңызға жету жолында бізге қосылыңыз! Тағы да басқа
            ақпараттар жөнінде немесе тегін сабаққа жазылу үшін бізге хабарлама
            жолдаңыз.Қанекей бірге білім алу жолын көңілді әрі әсерлі
            етейік!!👍💪
          </p>
        </div>
      </MyContainer>
    </div>
  );
}
