import { h, tw } from "../deps.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function Home(props: { latest: string }) {
  return (
    <div class={tw`max-w-screen-md mx-auto p-6`}>
      <Header />
      <p class={tw`mt-8`}>
        This page displays the status of all{" "}
        <a
          href="https://web-platform-tests.org/"
          class={tw`text-blue-500 hover:underline`}
        >
          Web Platform Tests
        </a>{" "}
        that are run in Deno CI. The WPT suite is shared between all browser
        vendors (Chrome, Firefox, Safari), and is used to check for
        compatibility between engines. It ensures that web APIs behave the same
        across different browsers.
      </p>
      <div class={tw`mt-4`}>
        <a
          href={`/${props.latest}`}
          class={tw`text-blue-500 hover:underline`}
        >
          View Data for Latest Commit
        </a>
      </div>
      <Footer />
    </div>
  );
}
