import { Step1 } from "./components/step1";
import { Step2 } from "./components/step2";
import { Step3 } from "./components/step3";
import { Step4 } from "./components/step4";
import { Step5 } from "./components/step5";
import { Step6 } from "./components/step6";
import { Step7 } from "./components/step7";
import { Step8 } from "./components/step8";
import { observer } from "mobx-react-lite";
import { useStore } from "./store";

const steps = () => {
  return {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
    4: <Step4 />,
    5: <Step5 />,
    6: <Step6 />,
    7: <Step7 />,
    8: <Step8 />,
  } as { [key: number]: React.ReactElement };
};

const App = observer(() => {
  const { step } = useStore();

  return (
    <main className="mx-auto pt-[30px] lg:pt-[50px]">
      <h2 className="font-semibold text-[26px] lg:text-[32px] mb-3 lg:mb-8 text-center">
        Проверка слуха онлайн
      </h2>
      <div className="flex container min-h-[436px] px-4 lg:px-6">
        {steps()[step]}
      </div>
    </main>
  );
});

export default App;
