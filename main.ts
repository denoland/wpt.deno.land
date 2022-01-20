#!/usr/bin/env -S deno run --allow-net --no-check

import { serve } from "https://deno.land/std@0.122.0/http/server.ts";

const URL =
  "https://wpt.fyi/results/?label=master&label=experimental&product=chrome&product=deno&product=firefox&product=safari&aligned";

console.log("Listening at http://localhost:8000/");
serve(() => Response.redirect(URL, 307));
