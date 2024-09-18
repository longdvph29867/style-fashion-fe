import { IAttributeValue } from "../types/productType";

export const formartCurrency = (number?: number) => {
  return number?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const formartRating = (number?: number) => {
  return (number as number) * 20;
};

export const showSpinner = () => {
  const spinnerElement = document.getElementById("spinner");
  if (spinnerElement) {
    spinnerElement.style.display = "flex";
  }
};
export const hiddenSpinner = () => {
  const spinnerElement = document.getElementById("spinner");

  if (spinnerElement) {
    spinnerElement.style.display = "none";
  }
};

export function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T) {
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const visilibitySpiner = (isLoading: boolean) => {
  if (isLoading) {
    showSpinner();
  } else {
    hiddenSpinner();
  }
};

export const getNameVariants = (tier_variant: IAttributeValue[]): string => {
  let nameVariant: string = "";
  tier_variant.forEach((variant, index) => {
    if (index > 0) {
      nameVariant += ` - ${variant.name}`;
    } else {
      nameVariant += variant.name;
    }
  });
  return nameVariant;
};

export function timeAgo(date: string) {
  const currentDate = new Date();
  const pastDate = new Date(date);
  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} years ago`;
  } else if (months > 0) {
    return `${months} months ago`;
  } else if (weeks > 0) {
    return `${weeks} weeks ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}
