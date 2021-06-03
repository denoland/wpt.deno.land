import { h, tw } from "../deps.ts";

export function Footer() {
  return (
    <p class={tw`mt-8 pt-4 border-t border-gray-200`}>
      <a
        href="https://github.com/denoland/wpt.deno.land"
        class={tw`text-blue-500 hover:underline`}
      >
        Edit this website on GitHub
      </a>
    </p>
  );
}
