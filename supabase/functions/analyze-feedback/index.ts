import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FeedbackInput {
  content: string;
  source: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feedbackItems } = await req.json() as { feedbackItems: FeedbackInput[] };
    
    if (!feedbackItems || !Array.isArray(feedbackItems)) {
      return new Response(
        JSON.stringify({ error: "Invalid input: feedbackItems array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const analyzedFeedback = [];

    // Analyze each feedback item
    for (const item of feedbackItems) {
      const systemPrompt = `You are a product feedback analyzer. Analyze the given feedback and return structured data.`;
      
      const userPrompt = `Analyze this customer feedback and categorize it:

Feedback: "${item.content}"
Source: "${item.source}"

Determine:
1. Category (one of: bug, feature, ux, pricing, performance)
2. Sentiment (positive, neutral, or negative)
3. Urgency score (1-10, where 10 is most urgent)
4. Impact score (1-10, where 10 has highest impact)
5. A brief summary (max 100 chars)

Return ONLY valid JSON with this exact structure:
{
  "category": "bug|feature|ux|pricing|performance",
  "sentiment": "positive|neutral|negative",
  "urgency": <number 1-10>,
  "impact": <number 1-10>,
  "summary": "brief summary"
}`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        console.error("AI Gateway error:", response.status, await response.text());
        throw new Error("AI analysis failed");
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      // Parse JSON from AI response
      let analysis;
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = aiResponse.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || 
                         aiResponse.match(/(\{[\s\S]*\})/);
        const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
        analysis = JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse AI response:", aiResponse);
        // Fallback values if parsing fails
        analysis = {
          category: "feature",
          sentiment: "neutral",
          urgency: 5,
          impact: 5,
          summary: item.content.substring(0, 100)
        };
      }

      analyzedFeedback.push({
        id: crypto.randomUUID(),
        content: item.content,
        source: item.source,
        category: analysis.category,
        sentiment: analysis.sentiment,
        urgency: Math.min(10, Math.max(1, analysis.urgency)),
        impact: Math.min(10, Math.max(1, analysis.impact)),
        summary: analysis.summary || item.content.substring(0, 100),
        createdAt: new Date().toISOString(),
      });
    }

    return new Response(
      JSON.stringify({ analyzedFeedback }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-feedback function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
