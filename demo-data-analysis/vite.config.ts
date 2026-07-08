import { cloudflare } from "@cloudflare/vite-plugin"
import { defineConfig } from "vite"
import vinext from "vinext"
import hostingConfig from "./.openai/hosting.json"
import { sites } from "./build/sites-vite-plugin"

export default defineConfig({
  plugins: [
    vinext(),
    sites(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      config: {
        main: "./worker/index.ts",
        compatibility_flags: ["nodejs_compat"],
        d1_databases: hostingConfig.d1
          ? [
              {
                binding: hostingConfig.d1,
                database_name: "summit-plumbing-dashboard-d1",
                database_id: "00000000-0000-4000-8000-000000000000",
              },
            ]
          : [],
        r2_buckets: hostingConfig.r2
          ? [
              {
                binding: hostingConfig.r2,
                bucket_name: "summit-plumbing-dashboard-r2",
              },
            ]
          : [],
      },
    }),
  ],
})
