import Layout from "@/components/Layout";
import model from "../assets/young-woman-playing-with-her-hair_329181-3522.avif";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const { toast } = useToast();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmitForm(data: RegisterSchema) {
    try {
      localStorage.setItem("userData", JSON.stringify(data));
      await new Promise((resolve) => setTimeout(resolve, 2));

      toast({
        title: "Register success!",
        description: "Please login",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Oops! something went wrong",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Layout>
        <div className="grid grid-cols-2 gap-40">
          <div>
            <img src={model} alt="model" className="w-[10rem] h-auto" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <h1 className="text-4xl text-pink-500 font-bold pb-8">Sign Up</h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="******************" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  onClick={() => onSubmitForm(form.getValues())}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
