import { router } from "../trpc";
import { authRouter } from "./auth";
import { filmeRouter } from "./filme";
// import { exampleRouter } from "./example";
import { filmesRouter } from "./filmes";

export const appRouter = router({
  // example: exampleRouter,
  auth: authRouter,
  filmes: filmesRouter,
  filme: filmeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
