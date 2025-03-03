import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useStore } from "@/store";

import { motion } from "framer-motion";

export const Step1 = () => {
  const [confirm, setConfirm] = useState(false);
  const { setStep } = useStore();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col text-start items-center"
    >
      <div className="p-4 rounded-[12px] bg-primary text-white leading-[24px] text-[16px] lg:text-[18px] font-semibold mb-8 mt-6">
        <p className="mb-3">
          Занимает 3 минуты и даёт общее представление о том, как вы слышите.
          Если результат указывает на снижение слуха - запишитесь на
          консультацию к специалисту.
        </p>
        <p>Бесплатно. Не имеет противопоказаний.</p>
      </div>

      <p className="font-semibold text-[20px] mx-auto mb-[60px]">
        Для проверки потребуются наушники и тихое помещение
      </p>

      <Button
        className="uppercase mb-10"
        disabled={!confirm}
        onClick={() => setStep(2)}
      >
        начать
      </Button>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          onCheckedChange={(checked: boolean) => setConfirm(checked)}
          checked={confirm}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Нажимая на кнопку, я принмаю условаия соглашения
        </label>
      </div>
    </motion.div>
  );
};
