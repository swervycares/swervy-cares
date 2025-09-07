import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const volunteerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age range is required"),
  location: z.string().min(1, "Location is required"),
  opportunities: z.array(z.string()).min(1, "Select at least one opportunity"),
  time: z.string().min(1, "Time commitment is required"),
  skills: z.string().min(1, "Skills are required"),
  motivation: z.string().min(1, "Please share your motivation"),
  comments: z.string().optional()
});

type VolunteerForm = z.infer<typeof volunteerSchema>;

export default function VolunteerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      location: "",
      opportunities: [],
      time: "",
      skills: "",
      motivation: "",
      comments: ""
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: VolunteerForm) => {
      const submitData = {
        ...data,
        opportunities: data.opportunities.join(', ')
      };
      const response = await apiRequest('POST', '/api/volunteer', submitData);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Volunteer Application Submitted!",
        description: "Thank you for your interest! We'll be in touch soon.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: VolunteerForm) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <Card className="bg-white rounded-3xl shadow-2xl p-12">
          <CardContent className="space-y-6">
            <div className="animate-bounce text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h3>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Your volunteer application has been submitted successfully. We're excited to have you join our mission and will be in touch soon!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Join Our Volunteer Team</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Help us make a difference in young girls' lives. Fill out the form below to get started with volunteering.
        </p>
      </div>

      <Card className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="w-8 h-8 bg-swervy-pink text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
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
                        <FormLabel className="text-sm font-semibold text-gray-700">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Age Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your age range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="16-18">16-18 years</SelectItem>
                            <SelectItem value="19-25">19-25 years</SelectItem>
                            <SelectItem value="26-35">26-35 years</SelectItem>
                            <SelectItem value="36+">36+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Location (City, State)</FormLabel>
                      <FormControl>
                        <Input placeholder="San Jose, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Volunteer Preferences */}
              <div className="space-y-6 border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="w-8 h-8 bg-swervy-turquoise text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Volunteer Interests
                </h3>

                <FormField
                  control={form.control}
                  name="opportunities"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 mb-4 block">
                        Select Volunteer Opportunities (choose all that interest you)
                      </FormLabel>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { id: "social_media", label: "Social Media & Marketing", desc: "Content creation and digital marketing" },
                          { id: "creative_design", label: "Creative & Design", desc: "Graphics, cards, educational materials" }
                        ].map((opportunity) => (
                          <FormField
                            key={opportunity.id}
                            control={form.control}
                            name="opportunities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={opportunity.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 border rounded-lg p-4"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(opportunity.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, opportunity.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== opportunity.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="font-semibold text-gray-800">
                                      {opportunity.label}
                                    </FormLabel>
                                    <p className="text-sm text-gray-600">
                                      {opportunity.desc}
                                    </p>
                                  </div>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Time Commitment</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2-3 hours per week" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Relevant Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Social media, design, teaching" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Why do you want to volunteer with Swervy Cares?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share what motivates you to support our mission..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Additional Comments (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional information you'd like to share..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-center">
                  <Button 
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="bg-gradient-to-r from-swervy-pink to-pink-500 hover:from-pink-500 hover:to-swervy-pink text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    size="lg"
                  >
                    {submitMutation.isPending ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  We'll review your application and get back to you within 3-5 business days.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}