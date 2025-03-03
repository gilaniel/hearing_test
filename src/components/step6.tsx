import { useStore } from "@/store";
import { Button } from "./ui/button";

import { motion } from "framer-motion";

export const Step6 = () => {
  const { setStep } = useStore();

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-between flex-1 w-full"
    >
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[24px] leading-[28px] mt-[150px]">
          Переходим к правому <span className="text-primary">уху</span>
        </p>
      </div>

      <div className="w-full">
        <div className="mt-10 flex justify-end">
          <div className="flex gap-5">
            <Button onClick={() => setStep(5)} variant="outline">
              Назад
            </Button>
            <Button onClick={() => setStep(7)} variant="secondary">
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
