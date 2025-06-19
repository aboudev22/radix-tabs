import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function App() {
  const tabs = ["Account", "Password", "Settings"];
  const tabsRef = useRef<HTMLParagraphElement[]>([]);
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const [selectProps, setSelectProps] = useState({ left: 0, width: 0 });

  const handleSelected = (index: number) => {
    setSelected(tabsRef.current[index]);
  };

  useEffect(() => {
    if (!selected) return;
    setSelectProps({
      left: selected.offsetLeft,
      width: selected.offsetWidth,
    });
  }, [selected]);

  useLayoutEffect(() => {
    if (tabsRef.current[0] && selected === null) {
      setSelected(tabsRef.current[0]);
    }
  }, [selected]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-transparent">
      <motion.div
        layout
        transition={{ delay: 0.2 }}
        className={clsx(
          "relative bg-neutral-900/50 rounded-md border-2 border-neutral-400 overflow-hidden",
          selected?.textContent === "Account"
            ? "h-56"
            : selected?.textContent === "Password"
            ? "h-40"
            : "h-36"
        )}
      >
        {/* Tabs */}
        <motion.section
          layout
          className="flex px-4 gap-4 border-b-2 border-neutral-400 relative"
        >
          {tabs.map((item, index) => (
            <motion.p
              layout
              key={item}
              ref={(el) => {
                if (el) tabsRef.current[index] = el;
              }}
              onClick={() => handleSelected(index)}
              className={clsx(
                "flex items-center justify-center px-8 py-3 text-xs cursor-pointer transition-all",
                selected?.textContent === tabsRef.current[index]?.textContent
                  ? "text-white"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              {item}
            </motion.p>
          ))}

          {/* Underline */}
          <motion.div
            layout
            layoutId="underline"
            animate={{
              left: selectProps.left,
              width: selectProps.width,
            }}
            className="absolute h-[2px] bg-pink-500 bottom-0"
          />
        </motion.section>
        {/* Content */}
        <AnimatePresence mode="wait">
          {selected?.textContent === "Account" && <Account key="Account" />}
          {selected?.textContent === "Password" && <Password key="Password" />}
          {selected?.textContent === "Settings" && <Settings key="Settings" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Account() {
  const style =
    "w-full px-2 rounded-md focus:outline-pink-500 outline-neutral-500 outline-[1px] placeholder:text-white text-white placeholder:text-xs";

  return (
    <motion.section
      layout
      key="Account"
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="p-5 flex justify-center flex-col gap-2"
    >
      <p className="text-white font-bold text-xs">Account settings</p>
      <input type="text" placeholder="username" className={style} />
      <input type="text" placeholder="email" className={style} />
      <button className="font-bold w-fit p-2 text-xs bg-pink-500 text-white rounded-md active:scale-90 transition-all cursor-pointer">
        Save changes
      </button>
    </motion.section>
  );
}

function Password() {
  return (
    <motion.section
      layout
      key="Password"
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="p-5 flex flex-col gap-2"
    >
      <p className="text-white font-bold text-xs">Password</p>
      <p className="text-neutral-300 text-xs">
        Change your password here. After saving, you'll be logged out.
      </p>
      <button className="p-2 w-fit font-bold bg-pink-500 text-xs text-white rounded-md active:scale-90 transition-all cursor-pointer">
        Change Password
      </button>
    </motion.section>
  );
}

function Settings() {
  return (
    <motion.section
      layout
      key="Settings"
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="py-2 px-5 flex flex-col gap-2"
    >
      <p className="text-white font-bold text-xs">Settings</p>
      <p className="text-neutral-300 text-xs">
        Manage your notification and privacy settings.
      </p>
      <button className="p-2 font-bold w-fit bg-pink-500 text-xs text-white rounded-md active:scale-90 transition-all cursor-pointer">
        Update Settings
      </button>
    </motion.section>
  );
}
