import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global third-party script loader and tracker.
 * Handles: Klaviyo onsite tracking, Judge.me widget bootstrap,
 * and provides injection points for future Shopify app scripts.
 *
 * Place <ThirdPartyScripts /> inside the Router so useLocation works.
 */

// ── Klaviyo ──
const KLAVIYO_COMPANY_ID = "PLACEHOLDER_KLAVIYO_ID"; // Replace with real Klaviyo public API key

function loadKlaviyo() {
  if (document.getElementById("klaviyo-script")) return;
  const s = document.createElement("script");
  s.id = "klaviyo-script";
  s.async = true;
  s.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${KLAVIYO_COMPANY_ID}`;
  document.head.appendChild(s);
}

// ── Judge.me ──
const JUDGEME_SHOP_DOMAIN = "PLACEHOLDER_SHOP_DOMAIN"; // e.g. "frosthaventubs.myshopify.com"

function loadJudgeMe() {
  if (document.getElementById("judgeme-script")) return;
  const s = document.createElement("script");
  s.id = "judgeme-script";
  s.async = true;
  s.src = `https://cdn.judge.me/widget_preloader.js`;
  s.dataset.shopDomain = JUDGEME_SHOP_DOMAIN;
  document.head.appendChild(s);
}

// ── Klaviyo event helpers (callable from anywhere) ──
export function trackKlaviyoEvent(name: string, properties?: Record<string, unknown>) {
  const _learnq = (window as any)._learnq || [];
  _learnq.push(["track", name, properties]);
}

export function identifyKlaviyo(email: string, properties?: Record<string, unknown>) {
  const _learnq = (window as any)._learnq || [];
  _learnq.push(["identify", { $email: email, ...properties }]);
}

export function trackKlaviyoProductView(product: {
  productId: string;
  title: string;
  price: number;
  imageUrl?: string;
  url?: string;
}) {
  trackKlaviyoEvent("Viewed Product", {
    ProductName: product.title,
    ProductID: product.productId,
    ImageURL: product.imageUrl,
    URL: product.url || window.location.href,
    Price: product.price,
  });
}

export function trackKlaviyoAddToCart(item: {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  variantId?: string;
  imageUrl?: string;
}) {
  trackKlaviyoEvent("Added to Cart", {
    ProductName: item.title,
    ProductID: item.productId,
    VariantID: item.variantId,
    Quantity: item.quantity,
    Price: item.price,
    ImageURL: item.imageUrl,
    URL: window.location.href,
  });
}

export function trackKlaviyoStartedCheckout(cart: {
  items: Array<{ title: string; productId: string; price: number; quantity: number }>;
  totalPrice: number;
  checkoutUrl?: string;
}) {
  trackKlaviyoEvent("Started Checkout", {
    $value: cart.totalPrice,
    CheckoutURL: cart.checkoutUrl,
    Items: cart.items.map((i) => ({
      ProductName: i.title,
      ProductID: i.productId,
      Quantity: i.quantity,
      ItemPrice: i.price,
    })),
  });
}

// ── Component ──
export const ThirdPartyScripts = () => {
  const location = useLocation();

  // Load scripts once
  useEffect(() => {
    loadKlaviyo();
    loadJudgeMe();
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackKlaviyoEvent("Viewed Page", {
      URL: window.location.href,
      Title: document.title,
    });
  }, [location.pathname]);

  // Future-proof: empty injection points for additional Shopify app scripts
  // Loyalty widgets, popup tools, upsell widgets, etc. can be loaded here.

  return null;
};
