import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Building2, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProductsByCollection } from "@/data/catalog";

const FORMSUBMIT_URL = "https://formsubmit.co/ajax/commercial@frosthaventubs.com";

const CommercialPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commercialProducts = getProductsByCollection("commercial-systems");
  const { toast } = useToast();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        body: new FormData(e.currentTarget),
      });
      if (response.ok) {
        setSubmitted(true);
        toast({ title: "Quote request submitted!", description: "Our commercial team will reach out within 1–2 business days." });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Commercial Cold Plunge Solutions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-capacity cold plunge systems built for gyms, wellness studios, athletic training facilities, and recovery centers.
            </p>
          </motion.div>

          {/* Commercial Products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {commercialProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {/* Quote Section */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="frost-card p-8 h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose FrostHaven Commercial?</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Volume pricing for multi-unit orders</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Dedicated account manager</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Custom installation support</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Extended commercial warranty</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Priority freight delivery</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Ongoing maintenance plans available</li>
                  </ul>
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Facility Types We Serve</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Gyms", "CrossFit Boxes", "Spas", "Hotels", "Sports Teams", "Physical Therapy", "Wellness Studios", "Universities"].map((type) => (
                        <span key={type} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{type}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Or email us directly at{" "}
                      <a href="mailto:commercial@frosthaventubs.com" className="text-primary hover:underline">commercial@frosthaventubs.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="frost-card p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Request a Commercial Quote</h3>
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-foreground mb-2">Thank You!</h4>
                      <p className="text-sm text-muted-foreground mb-6">We've received your inquiry. Our commercial team will contact you within 1–2 business days.</p>
                      <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another Inquiry</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_subject" value="New Commercial Quote Request" />
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                        <input name="name" placeholder="John Smith" required className="w-full text-sm rounded-lg border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label>
                        <input type="email" name="email" placeholder="john@facility.com" required className="w-full text-sm rounded-lg border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">Company</label>
                          <input name="company" placeholder="Facility name" className="w-full text-sm rounded-lg border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                          <input type="tel" name="phone" placeholder="(555) 000-0000" className="w-full text-sm rounded-lg border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Facility Type</label>
                        <select name="facilityType" className="w-full text-sm rounded-lg border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50 appearance-none cursor-pointer">
                          <option value="">Select facility type</option>
                          <option value="gym">Gym / Fitness Center</option>
                          <option value="spa">Spa / Wellness Studio</option>
                          <option value="sports">Sports Team / Athletic Facility</option>
                          <option value="hotel">Hotel / Resort</option>
                          <option value="pt">Physical Therapy / Rehab</option>
                          <option value="university">University / College</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
                        <textarea name="message" placeholder="Tell us about your facility, number of units needed, timeline, and any specific requirements..." rows={4} required className="w-full text-sm rounded-lg border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50 resize-none" />
                      </div>
                      <Button type="submit" variant="default" className="w-full" size="lg" disabled={isSubmitting}>
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommercialPage;
