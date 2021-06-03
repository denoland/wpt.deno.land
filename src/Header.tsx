import { h, tw } from "../deps.ts";

export function Header() {
  return (
    <div>
      <img
        src="https://deno.land/images/deno_logo_4.gif"
        class={tw`h-16 w-16 mr-4 float-left`}
      />
      <h1 class={tw`h-10 text-3xl font-bold`}>
        <a href="/">Deno</a>
      </h1>
      <h2 class={tw`h-6 text-xl font-semibold`}>Web Platform Compat Data</h2>
    </div>
  );
}
