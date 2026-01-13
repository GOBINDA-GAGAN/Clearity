import { Link, useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { LoginImage } from "@/assets";

// ---------------- SCHEMA ----------------
const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters"),
});


// ---------------- COMPONENT ----------------
export default function LoginPage() {
    const fetcher = useFetcher();
    const [showPassword, setShowPassword] = useState(false);


    const isLoading = fetcher.state !== "idle";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            {/* BIG CENTER CONTAINER */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-background rounded-xl shadow-lg overflow-hidden">

                {/* IMAGE */}
                <div className="md:flex hidden h-full w-full">
                    <img
                        src={LoginImage}
                        alt="Login"
                        className="w-full h-full"
                    />
                </div>

                {/* CARD */}
                <div className="flex items-center justify-center p-6">
                    <Card className="w-full max-w-sm border-0 shadow-none">
                        <CardHeader>
                            <CardTitle>Welcome back</CardTitle>
                            <CardDescription>
                                Enter your email to login
                            </CardDescription>
                        </CardHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-4">

                                    {/* EMAIL */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="you@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* PASSWORD WITH EYE ICON */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative ">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="••••••••"
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="cursor-pointer" size={18} />
                                                            ) : (
                                                                <Eye className="cursor-pointer" size={18} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>

                                <CardFooter className="flex flex-col gap-3 mt-4">
                                    <Button type="submit" className=" cursor-pointer w-full" disabled={isLoading}>
                                        {isLoading && <LoaderCircle className=" animate-spin" />}
                                        <span>
                                            Login
                                        </span>
                                    </Button>

                                    <p className="text-center text-sm text-muted-foreground">
                                        Don’t have an account?{" "}
                                        <Link
                                            to="/signup"
                                            className="text-primary font-medium hover:underline"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>

            </div>
        </div>
    );
}
