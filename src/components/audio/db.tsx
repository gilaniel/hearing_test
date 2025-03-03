"use client";

import { useState, useRef, FC, useEffect } from "react";
import VolumeSlider from "./slider";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";

interface AudioPlayerProps {
  audioUrl: string;
  hz: number;
  isRight?: boolean;
}

const AudioPlayer: FC<AudioPlayerProps> = observer(
  ({ audioUrl, hz, isRight }) => {
    const { setStats } = useStore();

    const [volumeDB, setVolumeDB] = useState(80);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    const splitterRef = useRef<ChannelSplitterNode | null>(null);
    const mergerRef = useRef<ChannelMergerNode | null>(null);

    function dBFSToGain(dbfs: number) {
      return Math.pow(10, dbfs / 20);
    }

    const initAudioApi = () => {
      if (!audioRef.current || gainNodeRef.current) return;

      const audio = new Audio();
      audio.crossOrigin = "anonymous";

      audioContextRef.current = new AudioContext();

      splitterRef.current = audioContextRef.current.createChannelSplitter(2);
      mergerRef.current = audioContextRef.current.createChannelMerger(2);

      const source = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );
      const gainNode = audioContextRef.current.createGain();

      gainNode.gain.value = dBFSToGain(volumeDB - 100);
      source
        .connect(splitterRef.current)
        .connect(mergerRef.current, 0, isRight ? 1 : 0);

      mergerRef.current.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      gainNodeRef.current = gainNode;
    };

    const updateGain = (dB: number) => {
      if (!audioRef.current) return;

      if (gainNodeRef.current) {
        const gain = dBFSToGain(dB - 100);
        gainNodeRef.current.gain.setValueAtTime(
          gain,
          audioContextRef.current!.currentTime
        );
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    };

    const handleVolumeChange = (value: number) => {
      initAudioApi();

      const newVolume = value;
      setVolumeDB(newVolume);
      updateGain(newVolume);

      setStats(isRight ? "right" : "left", hz, newVolume - 100);
    };

    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }, []);

    return (
      <div className="audio-player">
        <audio ref={audioRef} src={audioUrl} />

        <div className="controls">
          <div className="volume-control">
            <VolumeSlider handleDbChange={handleVolumeChange} hz={hz} />
          </div>
        </div>
      </div>
    );
  }
);

export default AudioPlayer;
