import { useStore } from "@/store";
import AudioPlayer from "./audio/db";
import { observer } from "mobx-react-lite";
import { Button } from "./ui/button";
import { useState } from "react";

import { motion } from "framer-motion";

export const Step5 = observer(() => {
  const { setStep } = useStore();
  const [hz, setHz] = useState(500);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-between flex-1 w-full"
    >
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[22px] lg:text-[24px] leading-[24px] lg:leading-[28px] mt-6 mb-[60px]">
          <span className="text-primary">Двигайте</span> позунок или{" "}
          <span className="text-primary">используйте</span> кнопки до тех пор,
          пока не услышите тон
        </p>

        <p className="mb-[40px] font-semibold text-[20px]">
          Левое ухо - {hz}Hz
        </p>

        <AudioPlayer audioUrl={`/hearing/warble_${hz}.wav`} hz={hz} />
      </div>

      <div className="w-full">
        <div className="mt-10 flex justify-end">
          <div className="flex gap-5">
            <Button
              onClick={() => {
                if (hz > 500) {
                  setHz(hz / 2);
                  return;
                }

                setStep(4);
              }}
              variant="outline"
            >
              Назад
            </Button>
            <Button
              onClick={() => {
                if (hz < 4000) {
                  setHz(hz * 2);
                  return;
                }
                setStep(6);
              }}
              variant="secondary"
            >
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
