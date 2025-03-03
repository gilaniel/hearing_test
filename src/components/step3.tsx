import { observer } from "mobx-react-lite";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useStore } from "@/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { motion } from "framer-motion";

export const Step3 = observer(() => {
  const { stats, setSex, setAge, setStep } = useStore();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-between flex-1"
    >
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[20px] lg:text-[24px] leading-[24px] lg:leading-[28px] mt-6 mb-10">
          Добавить немного информации перед началом, чтобы собирать статистику
          на выходе
        </p>

        <div className="flex flex-col gap-5 font-semibold">
          <div className="flex items-center gap-5">
            <span className="whitespace-nowrap w-[100px]">Ваш пол</span>
            <RadioGroup
              value={stats.sex}
              className="flex"
              onValueChange={(v) => setSex(v)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <label htmlFor="male">Мужской</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <label htmlFor="female">Женский</label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-5 flex-nowrap">
            <span className="whitespace-nowrap w-[100px]">Ваш возраст</span>
            <Input
              type="number"
              min={0}
              className="w-[70px]"
              value={stats.age || ""}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="mt-10 flex justify-end">
          <div className="flex gap-5">
            <Button onClick={() => setStep(2)} variant="outline">
              Назад
            </Button>
            <Button
              onClick={() => setStep(4)}
              variant="secondary"
              disabled={!stats.age || !stats.sex}
            >
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
