import { useStore } from "@/store";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { Check } from "lucide-react";

export const Step8 = observer(() => {
  const { stats } = useStore();

  const checkHearing = () => {
    let isProblem = false;

    for (const i in stats.left) {
      if (stats.left[i] > -80) {
        isProblem = true;
      }
    }

    for (const i in stats.right) {
      if (stats.right[i] > -80) {
        isProblem = true;
      }
    }

    return isProblem;
  };

  useEffect(() => {
    checkHearing();
  }, []);

  const isProblem = checkHearing();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-between flex-1 w-full"
    >
      <div className="flex flex-col items-center">
        <div className="font-semibold text-[22px] lg:text-[24px] leading-[24px] lg:leading-[28px] mt-6 mb-[60px] text-center">
          {isProblem ? (
            <>
              <p>Возможно, у вас снижен слух.</p>
              <p>Для точной оценки посетите центр хороешго слуха</p>
            </>
          ) : (
            <>
              <p>Вы слышите великолепно!</p>
              <p className="font-[400]">
                Здорово, что вы уделили себе время и позаботились о слухе. Если
                остались сомнения - приходите в центр хорошего слуха на
                консультацию к специалисту.
              </p>
            </>
          )}
        </div>

        <div className="p-3 rounded-[6px] border-[1px] border-[#ccc] w-[150px] h-[150px] relative">
          {!isProblem && (
            <div className="absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-22px] w-[30px] h-[30px] rounded-full bg-primary text-white flex items-center justify-center">
              <Check />
            </div>
          )}
          <div className="flex items-end gap-3 h-full justify-center">
            <div className="result-item"></div>
            <div
              className="result-item"
              style={{
                height: isProblem ? "85%" : "90%",
                background: isProblem ? "#786da3" : "",
              }}
            ></div>
            <div
              className="result-item"
              style={{
                height: isProblem ? "70%" : "80%",
                background: isProblem ? "#93658d" : "",
              }}
            ></div>
            <div
              className="result-item"
              style={{
                height: isProblem ? "55%" : "70%",
                background: isProblem ? "#a45776" : "",
              }}
            ></div>
            <div
              className="result-item"
              style={{
                height: isProblem ? "40%" : "75%",
                background: isProblem ? "#b64660" : "",
              }}
            ></div>
            <div
              className="result-item"
              style={{
                height: isProblem ? "25%" : "100%",
                background: isProblem ? "#c5334a" : "",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="mt-10 flex justify-center sm:justify-end">
          <div className="flex flex-col sm:flex-row gap-5">
            <Button onClick={() => {}} variant="outline">
              Как лечат потерю слуха
            </Button>
            <Button onClick={() => {}} variant="secondary">
              <a
                href="https://www.radugazvukov.ru/centers/calendar/"
                className="text-white"
              >
                Записаться на приём
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
