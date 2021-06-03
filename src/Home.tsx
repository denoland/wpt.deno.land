import { h, tw } from "../deps.ts";
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
        that are run for Deno.
      </p>
      <div class={tw`mt-4`}>
        <a
          href={`/${props.latest}`}
          class={tw`text-blue-500 hover:underline`}
        >
          View Latest Commit
        </a>
      </div>
    </div>
  );
}
