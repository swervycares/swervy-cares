import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kitRequestValidationSchema, type KitRequestForm as KitRequestFormData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";


interface KitRequestFormProps {
  aiSuggestions?: any;
}

export default function KitRequestForm({ aiSuggestions }: KitRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<KitRequestFormData>({
    resolver: zodResolver(kitRequestValidationSchema),
    defaultValues: {
      requestType: "individual",
      name: "",
      age: "",
      address: "",
      email: "",
      phone: "",
      organizationName: "",
      staffName: "",
      staffRole: "",
      contactEmail: "",
      contactPhone: "",
      organizationType: "",
      quantity: "",
      ageGroups: "",
      specialNeeds: "",
      bulkCustomization: "",
      shade: aiSuggestions?.lipShade || "",
      scent: aiSuggestions?.scent || "",
      lashes: aiSuggestions?.lashes || "",
      oil: aiSuggestions?.oil || "",
      scrub: "",
      confidence: "",
      consent: false,
      aiSuggestions: aiSuggestions ? JSON.stringify(aiSuggestions) : ""
    }
  });

  const requestType = form.watch("requestType");

  const submitMutation = useMutation({
    mutationFn: async (data: KitRequestFormData) => {
      // Send all data including consent to backend
      const response = await apiRequest('POST', '/api/kit-request', data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Kit Request Submitted!",
        description: "Thank you! We'll be in touch soon with your personalized kit.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: KitRequestFormData) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <section id="request" className="py-20 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white rounded-3xl shadow-2xl p-12">
            <CardContent className="space-y-6">
              <div className="animate-bounce text-6xl mb-6">🎉</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h3>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Your personalized kit request has been submitted successfully. We'll be in touch soon with your amazing self-care package!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="py-20 px-4 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Request Your Personalized Kit</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about yourself so we can create the perfect self-care experience tailored just for you.
          </p>
        </div>

        <Card className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <CardContent>
            {/* AI Suggestions Display */}
            {aiSuggestions && (
              <div className="mb-8 bg-gradient-to-r from-swervy-pale-pink to-teal-50 rounded-xl p-6 border-l-4 border-swervy-pink">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                  <span className="text-2xl mr-2">🤖</span>
                  AI Recommendations
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <strong>💄 Recommended Lip Shade:</strong><br />
                    <span className="text-swervy-pink">{aiSuggestions.lipShade}</span>
                  </div>
                  <div>
                    <strong>🌸 Recommended Scent:</strong><br />
                    <span className="text-swervy-turquoise">{aiSuggestions.scent}</span>
                  </div>
                  <div>
                    <strong>👁️ Recommended Lashes:</strong><br />
                    <span className="text-pink-500">{aiSuggestions.lashes}</span>
                  </div>
                  <div>
                    <strong>✨ Special Extras:</strong><br />
                    <span className="text-gray-700">{aiSuggestions.additionalItems?.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Who is requesting selector with radio buttons */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-swervy-pink text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    Who is requesting?
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="requestType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            className="space-y-4"
                          >
                            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-swervy-pink hover:bg-pink-50 transition-colors">
                              <RadioGroupItem value="individual" id="individual" />
                              <FormLabel htmlFor="individual" className="text-base font-medium text-gray-700 cursor-pointer flex-1">
                                💁‍♀️ I am an individual requesting a kit for myself.
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-swervy-turquoise hover:bg-teal-50 transition-colors">
                              <RadioGroupItem value="organization" id="organization" />
                              <FormLabel htmlFor="organization" className="text-base font-medium text-gray-700 cursor-pointer flex-1">
                                🏢 I am an organization/staff member requesting kits for clients.
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Organization Information (only show if organization request) */}
                {requestType === "organization" && (
                  <div className="space-y-6 border-t border-gray-200 pt-8">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <span className="w-8 h-8 bg-swervy-turquoise text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                      Organization & Contact Information
                    </h3>
                    
                    {/* Organization Name */}
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-gray-700">Organization Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Women's Shelter, Community Center" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Your Name & Role */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="staffName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Your Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="staffRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Your Role *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="case-manager">Case Manager</SelectItem>
                                <SelectItem value="social-worker">Social Worker</SelectItem>
                                <SelectItem value="volunteer">Volunteer</SelectItem>
                                <SelectItem value="director">Director</SelectItem>
                                <SelectItem value="coordinator">Program Coordinator</SelectItem>
                                <SelectItem value="counselor">Counselor</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="nurse">Nurse/Healthcare Provider</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Email & Phone for follow-up */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Email (for follow-up) *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@organization.org" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Phone (optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Number of Kits Requested */}
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-gray-700">Number of Kits Requested *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 10, 25, 50" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Additional Information */}
                    <FormField
                      control={form.control}
                      name="ageGroups"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Age Groups of Recipients (optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g., Mix of 12-16 year olds, mostly 14-15 year olds, etc."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialNeeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Special Considerations or Needs (optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific needs, allergies, cultural considerations, or special circumstances we should know about"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Bulk Customization Preferences */}
                    <FormField
                      control={form.control}
                      name="bulkCustomization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Customization Preferences for Bulk Order (optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select customization preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mixed-variety">🌈 Mixed Variety - Different colors/scents for variety</SelectItem>
                              <SelectItem value="age-appropriate">👥 Age-Appropriate - Customize based on age groups</SelectItem>
                              <SelectItem value="cultural-preferences">🌍 Cultural Preferences - Consider cultural/religious needs</SelectItem>
                              <SelectItem value="specific-colors">🎨 Specific Colors - I have preferred colors in mind</SelectItem>
                              <SelectItem value="neutral-tones">🤍 Neutral Tones - Stick to neutral, universal colors</SelectItem>
                              <SelectItem value="no-preference">✨ No Preference - Surprise us with your best selection</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Individual/Recipient Information */}
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-swervy-pink text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {requestType === "organization" ? "3" : "2"}
                    </span>
                    {requestType === "organization" ? "Recipient Information (if specific)" : "About You"}
                  </h3>
                  
                  {requestType === "organization" && (
                    <p className="text-gray-600 text-sm mb-4">
                      If you're ordering for a specific person, fill out their details. For bulk orders with mixed preferences, you can leave some fields general.
                    </p>
                  )}
                  
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
                              <SelectItem value="6-10">6-10 years</SelectItem>
                              <SelectItem value="11-13">11-13 years</SelectItem>
                              <SelectItem value="14-16">14-16 years</SelectItem>
                              <SelectItem value="17+">17+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Mailing Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address, city, state, zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Email (optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Phone Number (optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-swervy-turquoise text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {requestType === "organization" ? "4" : "3"}
                    </span>
                    {requestType === "organization" ? "Product Preferences" : "Your Preferences"}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="shade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Lip Shade Preference</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your favorite shade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60 overflow-auto">
                              {/* Pinks & Corals */}
                              <SelectItem value="Baby Pink">🌸 Baby Pink - Soft and sweet</SelectItem>
                              <SelectItem value="Rose Pink">🌹 Rose Pink - Classic beauty</SelectItem>
                              <SelectItem value="Hot Pink">💕 Hot Pink - Bold and fun</SelectItem>
                              <SelectItem value="Coral">🪸 Coral - Warm and vibrant</SelectItem>
                              <SelectItem value="Salmon">🐟 Salmon - Peachy pink</SelectItem>
                              <SelectItem value="Magenta">💖 Magenta - Electric pink</SelectItem>
                              <SelectItem value="Fuchsia">🦩 Fuchsia - Bright and daring</SelectItem>
                              
                              {/* Reds & Berries */}
                              <SelectItem value="Cherry Red">🍒 Cherry Red - Classic red</SelectItem>
                              <SelectItem value="Strawberry">🍓 Strawberry - Sweet red</SelectItem>
                              <SelectItem value="Berry">🫐 Berry - Deep purple-red</SelectItem>
                              <SelectItem value="Raspberry">🫰 Raspberry - Bright berry</SelectItem>
                              <SelectItem value="Wine">🍷 Wine - Rich and elegant</SelectItem>
                              <SelectItem value="Crimson">❤️ Crimson - Bold red</SelectItem>
                              
                              {/* Purples */}
                              <SelectItem value="Lavender">💜 Lavender - Soft purple</SelectItem>
                              <SelectItem value="Plum">🔮 Plum - Rich purple</SelectItem>
                              <SelectItem value="Violet">💙 Violet - Bright purple</SelectItem>
                              <SelectItem value="Grape">🍇 Grape - Deep purple</SelectItem>
                              <SelectItem value="Lilac">🦄 Lilac - Light purple</SelectItem>
                              
                              {/* Oranges & Peaches */}
                              <SelectItem value="Peach">🍑 Peach - Soft and sweet</SelectItem>
                              <SelectItem value="Apricot">🧡 Apricot - Warm orange</SelectItem>
                              <SelectItem value="Tangerine">🍊 Tangerine - Bright orange</SelectItem>
                              <SelectItem value="Sunset Orange">🌅 Sunset Orange - Bold orange</SelectItem>
                              
                              {/* Neutrals & Nudes */}
                              <SelectItem value="Nude">🤎 Nude - Natural beauty</SelectItem>
                              <SelectItem value="Beige">🪵 Beige - Soft neutral</SelectItem>
                              <SelectItem value="Taupe">🤍 Taupe - Cool neutral</SelectItem>
                              <SelectItem value="Mauve">💕 Mauve - Purple-brown</SelectItem>
                              <SelectItem value="Caramel">🍮 Caramel - Warm brown</SelectItem>
                              
                              {/* Fun & Unique */}
                              <SelectItem value="Clear">✨ Clear - Natural shine</SelectItem>
                              <SelectItem value="Gold">⭐ Gold - Shimmery glam</SelectItem>
                              <SelectItem value="Bronze">🥉 Bronze - Warm metallic</SelectItem>
                              <SelectItem value="Rose Gold">🌟 Rose Gold - Trendy metallic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Lip Scent Preference</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your favorite scent" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60 overflow-auto">
                              {/* Sweet Treats */}
                              <SelectItem value="Vanilla">🍰 Vanilla - Sweet and comforting</SelectItem>
                              <SelectItem value="Cotton Candy">🍭 Cotton Candy - Sugary sweet</SelectItem>
                              <SelectItem value="Cake Batter">🧁 Cake Batter - Birthday vibes</SelectItem>
                              <SelectItem value="Caramel">🍮 Caramel - Rich and smooth</SelectItem>
                              <SelectItem value="Root Beer">🥤 Root Beer - Unique and fun</SelectItem>
                              
                              {/* Fruity Favorites */}
                              <SelectItem value="Strawberry">🍓 Strawberry - Fresh and sweet</SelectItem>
                              <SelectItem value="Raspberry">🫰 Raspberry - Tart and juicy</SelectItem>
                              <SelectItem value="Peach">🍑 Peach - Soft and summery</SelectItem>
                              <SelectItem value="Watermelon">🍉 Watermelon - Fresh and cool</SelectItem>
                              <SelectItem value="Banana">🍌 Banana - Tropical and creamy</SelectItem>
                              <SelectItem value="Blueberry">🫐 Blueberry - Sweet and fresh</SelectItem>
                              
                              {/* Tropical & Exotic */}
                              <SelectItem value="Coconut">🥥 Coconut - Tropical paradise</SelectItem>
                              <SelectItem value="Pineapple">🍍 Pineapple - Tropical tang</SelectItem>
                              <SelectItem value="Mango">🥭 Mango - Sweet tropical</SelectItem>
                              
                              {/* Classic & Fresh */}
                              <SelectItem value="Mint">🌿 Mint - Cool and refreshing</SelectItem>
                              <SelectItem value="Citrus">🍊 Citrus - Bright and energizing</SelectItem>
                              <SelectItem value="Floral">🌸 Floral - Fresh and delicate</SelectItem>
                              <SelectItem value="Unscented">🚫 Unscented - No fragrance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="lashes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Lashes Preference</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your lash preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Natural">👁️ Natural - Subtle enhancement</SelectItem>
                              <SelectItem value="Glam">✨ Glam - Dramatic and bold</SelectItem>
                              <SelectItem value="No Lashes">🚫 No Lashes - Skip this item</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="oil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Lip Oil</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Include lip oil?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Yes">💧 Yes - Love that glossy look</SelectItem>
                              <SelectItem value="No">❌ No - Prefer without</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="scrub"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Lip Scrub Scent Preferences</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Vanilla, Citrus, Berry - tell us your favorites!" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Personal Touch Section */}
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {requestType === "organization" ? "5" : "4"}
                    </span>
                    {requestType === "organization" ? "Personal Touch" : "Your Personal Touch"}
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="confidence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">What makes you feel confident?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share what makes you feel your best... maybe it's a certain color, activity, or mindset that boosts your confidence!"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Consent and Submit */}
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {requestType === "organization" ? "6" : "5"}
                    </span>
                    Submit Your Request
                  </h3>
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-700">
                            I consent to receiving a personalized self-care kit and understand my information will be used to create it. 
                            Your privacy is important to us, and we'll only use this information to make your perfect kit.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="text-center">
                    <Button 
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="bg-gradient-to-r from-swervy-pink to-pink-500 hover:from-pink-500 hover:to-swervy-pink text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      {submitMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <LoadingSpinner size="small" color="white" text="" />
                          <span>Submitting your request...</span>
                        </div>
                      ) : (
                        "🎁 Submit Kit Request"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
