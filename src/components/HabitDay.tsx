import * as PopOver from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitDayProps {
	date: Date;
	amount?: number;
	defaultCompleted?: number;
}

const HabitDay = ({
	defaultCompleted = 0,
	amount = 0,
	date,
}: HabitDayProps) => {
	const [completed, setCompleted] = useState(defaultCompleted);

	const completedPercentage =
		amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayAndMonth = dayjs(date).format("DD/MM");
	const dayOfWeek = dayjs(date).format("dddd");
	const today = dayjs().startOf("day").format("DD/MM");

	function handleCompletedChanged(completed: number) {
		setCompleted(completed);
	}

	return (
		<PopOver.Root>
			<PopOver.Trigger
				className={clsx(
					"w-10 h-10 border-2 rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-background",
					{
						"bg-zinc-900 border-zinc-800":
							completedPercentage === 0,
						"bg-violet-900 border-violet-700":
							0 < completedPercentage &&
							completedPercentage <= 20,
						"bg-violet-800 border-violet-600":
							20 < completedPercentage &&
							completedPercentage <= 40,
						"bg-violet-700 border-violet-500":
							40 < completedPercentage &&
							completedPercentage <= 60,
						"bg-violet-600 border-violet-400":
							60 < completedPercentage &&
							completedPercentage <= 80,
						"bg-violet-500 border-violet-300":
							completedPercentage > 80,
						"border-white border-4": today === dayAndMonth,
					}
				)}
			/>

			<PopOver.Portal>
				<PopOver.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
					<span className="font-semibold text-zinc-400">
						{dayOfWeek}
					</span>
					<span className="mt-1 font-extrabold leading-tight text-3xl">
						{dayAndMonth}
					</span>

					<ProgressBar progress={completedPercentage} />

					<HabitsList
						date={date}
						onCompletedChanged={handleCompletedChanged}
					/>

					<PopOver.Arrow
						height={8}
						width={16}
						className="fill-zinc-900"
					/>
				</PopOver.Content>
			</PopOver.Portal>
		</PopOver.Root>
	);
};

export default HabitDay;
