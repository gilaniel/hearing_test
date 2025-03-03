import { useStore } from "@/store";
import { Button } from "./ui/button";

import { motion } from "framer-motion";

export const Step2 = () => {
  const { setStep } = useStore();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col text-start items-center"
    >
      <p className="font-semibold text-[22px] lg:text-[24px] leading-[24px] lg:leading-[28px] mb-5 mt-2">
        Найдите тихое место <br />и наденьте{" "}
        <span className="text-primary">наушники</span>
      </p>

      <div className="flex flex-col gap-5 lg:gap-8 text-[18px] lg:text-[20px] font-semibold">
        <div className="flex items-start">
          <span className="list-count">1</span>
          <p>
            Подключите нашники к устройству, на котором вы будете проходить
            проверку
          </p>
        </div>
        <div className="flex items-start">
          <span className="list-count">2</span>
          <p>Убедитесь в том, что наушники работают</p>
        </div>
        <div className="flex items-start">
          <span className="list-count">3</span>
          <p>Установите максимальную громкость</p>
        </div>
        <div className="flex items-start">
          <span className="list-count">4</span>
          <p>
            Проверка слуха происходит на разных частотах. После того как
            услышали тон - нажмите «
            <span className="text-primary">Продолжить»</span>
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="mt-10 flex justify-end">
          <div className="flex gap-5">
            <Button onClick={() => setStep(1)} variant="outline">
              Назад
            </Button>
            <Button onClick={() => setStep(3)} variant="secondary">
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
