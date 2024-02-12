"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import Todos from "@/components/Todos";
import Redirect from "@/components/Redirect";

const formSchema = z.object({
    todo: z.string()
})

export default function Home() {
  const user = useUserStore((state) => state.user)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch("http://localhost:8000/api/todo/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        title: values.todo
      })
    })

    const data = await res.json()
  }

  if(!user) return (<Redirect />)

  return (
    <main className="m-[5em]">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5">
      <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Enter Todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-green-600 text-white" variant="outline">Add</Button>
      </form>
      </Form>
      <div className="mt-5">
        <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Your Todos
        </h3>
        <Todos />
      </div>
    </main>
  );
}
