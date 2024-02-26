import Layout from "@/components/Layout";
import model from "../assets/young-woman-playing-with-her-hair_329181-3522.avif";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/utils/types";
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

const Login = () => {
  const { toast } = useToast();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitForm(data: LoginSchema) {
    try {
      const storedUserDataString = localStorage.getItem("userData");

      if (storedUserDataString) {
        const storedUserData = JSON.parse(storedUserDataString);

        if (
          data.email === storedUserData.email &&
          data.password === storedUserData.password
        ) {
          toast({
            title: "Login successful!",
            description: "Welcome back!",
            variant: "default",
          });
        } else {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "User not found",
          description: "Please register first.",
          variant: "destructive",
        });
      }
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
        <div className="grid grid-cols-2 gap-20">
          <div>
            <img src={model} alt="model" className="w-[10rem] h-auto" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <h1 className="text-4xl text-pink-500 font-bold pb-8">Login</h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-2"
              >
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
                        <Input placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  onClick={() => onSubmitForm(form.getValues())}
                  className="w-1/3 rounded-3xl bg-pink-400"
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

export default Login;
