import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatRelativeTime = (timestamp: number): string => {
  return dayjs(timestamp).fromNow();
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

export const formatChange = (percentage: number): string => {
  const formatted = percentage.toFixed(2);
  if (percentage > 0) {
    return `📈 +${formatted}%`;
  } else if (percentage < 0) {
    return `📉 ${formatted}%`;
  } else {
    return `➡️ ${formatted}%`;
  }
};

export const getTrendEmoji = (dayChange: number): string => {
  return dayChange > 0 ? "🚀" : dayChange < 0 ? "📉" : "➡️";
};
