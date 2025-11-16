import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Logo() {
  return (
    <Link href="/">
      <div
        className={`inline-block bg-transparent pb-1 cursor-pointer ${outfit.className}`}
      >
        <span className="font-bold text-3xl text-blue-500 dark:text-blue-500">
          invest
          <span className="font-extrabold text-blue-500 text-3xl dark:text-blue-500">
            ထ
          </span>
          fin
        </span>
      </div>
    </Link>
  );
}
