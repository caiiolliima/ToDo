// import { describe, it, expect, vi } from "vitest";
// import { renderHook, waitFor } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider as JotaiProvider } from "jotai";
// import useTasks from "./use-tasks";

// function wrapper({ children }: { children: React.ReactNode }) {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: { retry: false },
//     },
//   });
//   return (
//     <QueryClientProvider value={queryClient}>
//       <JotaiProvider>{children}</JotaiProvider>
//     </QueryClientProvider>
//   )};

// describe("useTasks", () => {
//   it("returns tasks and counts from localStorage when no token", () => {
//     localStorage.setItem(
//       "tasks",
//       JSON.stringify([
//         { id: "1", title: "Task 1", concluded: false, state: "Created" },
//         { id: "2", title: "Task 2", concluded: true, state: "Created" },
//       ])
//     );
//     const { result } = renderHook(() => useTasks(), { wrapper });
//     expect(result.current.tasks).toHaveLength(2);
//     expect(result.current.createdTasksCount).toBe(2);
//     expect(result.current.concludedTasksCount).toBe(1);
//     localStorage.removeItem("tasks");
//   });

//   it("returns empty tasks when localStorage is empty", () => {
//     localStorage.removeItem("tasks");
//     const { result } = renderHook(() => useTasks(), { wrapper });
//     expect(result.current.tasks).toEqual([]);
//     expect(result.current.createdTasksCount).toBe(0);
//     expect(result.current.concludedTasksCount).toBe(0);
//   });
// });
