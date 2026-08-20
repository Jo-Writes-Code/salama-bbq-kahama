# Live Verification Notes

The desktop preview loads as a standalone HTML/CSS/JavaScript site with the expected single-page sections and `tel:+15550130723` call links. The revised opening now uses a white, media-first editorial layout, followed by a separate text-and-pickup-information band. The revised menu displays exactly three photographed item cards and a See Menu trigger. The updated mobile view keeps the hero copy at a readable one-column width and stacks the three menu items as individual cards.

The See Menu trigger was also exercised on the live page. It opens a dialog containing six full-menu rows and a working `tel:+15550130723` order link.

The animated revision was checked on the live page. The restored hero shows the earlier “Big flavor. One quick call.” message beside the food image and includes the direct call button. The motion system applies the `js-motion` state, activates six visible reveal elements, and updates the hero image parallax offset during scroll while retaining the reduced-motion fallback.

The refined hero was visually checked at desktop and mobile sizes. The title and call button now sit directly over the large food image with a dark image overlay for readable contrast. The “Taking calls for pickup” text has been removed, and the image has returned to a large hero presentation.

The stronger hero parallax was measured after scrolling. The headline/call stack shifted by 29px, the food image by 19px, the yellow “Hot off the Grill” circle by -32px, and the flame-grill seal by 14px, creating the requested differential motion while retaining the reduced-motion safeguard.

The amplified text treatment was measured independently after scrolling. The headline now shifts by 77px vertically and 27px horizontally, while the description and call action follow separate motion paths. This makes the text parallax visibly stronger than the image’s movement without compromising its contrast overlay.

The correction was verified after scrolling: headline, description, and call action horizontal offsets are all 0px, while their vertical parallax remains visible. The hero’s yellow circular badge continues to move independently on its vertical track.

The uniform hero text motion was verified after scrolling. The shared hero-copy container moves by 50px vertically, while headline, description, and call-action transforms remain at 0px; the full text stack therefore stays aligned. The yellow hero badge keeps its separate vertical movement.

The hero text parallax direction was reversed and verified after scrolling. The shared text group now has a -51px vertical offset, confirming that it travels upward as the page moves down. The yellow badge continues on its independent track.

The food-and-drinks refresh was visually verified at desktop and mobile sizes. The hero now retains its dark studio composition and left-side text-safe space while displaying colorful fruit drinks, fruit cross-sections, and chicken samosas to the right. The three menu cards show Vegetable Pizza, Chips Mshikaki, and Ugali & Beans with their dedicated food imagery.

The revised side-profile hero was visually checked at desktop and mobile sizes. It now shows char-grilled chicken as the right-side hero food, with colorful drinks and chicken samosas grouped around it. The updated “Flame first. Flavor follows.” slogan remains readable over the preserved left-side dark text field.

The supplied menu-photo update was visually checked. `veg-pizza.jfif` appears on Vegetable Pizza, `mshikaki2.jfif` appears on Chips Mshikaki, and `ugali2.jfif` appears on Ugali & Beans.

The supplied grill photo was cropped before its white foreground and added immediately above the legal footer. Desktop and mobile checks show the cook and grill as the visible focus without the original white lower area.

The placement correction was visually verified at desktop and mobile sizes. The cropped supplied grill photo now replaces the image in the “Fast food with a little fire in it.” section, and the duplicate bottom-of-page grill block has been removed.

The EN/SW control was tested live. It updates the navigation, hero, menu, story, call-to-order text, and visit content into Kiswahili while preserving the Kahama, Shinyanga, Tanzania location and TZS prices.

The dark-mode control was also tested live and persists its active state. The test identified a hero text-contrast issue in the dark theme, which is being corrected before delivery.

The dark-theme correction was checked live. The Kiswahili hero title now renders in high-contrast cream and ember red, and the call-to-order button is cream with dark green text, while the dark navigation controls remain legible.

The Tanzania-localized page was also checked at mobile size. The green navigation call CTA, TZS menu prices, Kahama, Shinyanga, Tanzania location, and compact theme/language controls remain readable and reachable.

The refined language control was tested live: when the site is in Kiswahili, the control says EN; after switching to English, it says SW. The refined dark mode now uses subdued green hero, ticker, menu-card, and call-panel borders without bright white outlines or high-luminance yellow stripe fields.

The final border simplification was measured in dark mode. The hero and lower call-to-order panel each retain a 2px near-black border (`rgb(5, 14, 10)`), while the menu cards, menu action row, and ticker borders are transparent.

The three menu cards retain their borderless presentation and now regain a deep dark hover shadow, increasing from a subtle 5px offset to a 10px near-black offset on hover.

The refreshed slogan was checked in both language modes: “Grill. Sip. Repeat.” in English and “Choma. Kunywa. Rudia.” in Kiswahili. Both remain legible within the hero image’s protected left-side text area.

The hero image clip and circle overlay layers were checked at desktop and mobile sizes. The photo remains framed, while both circular hero overlays are outside the image clip and stay visible when moving beyond its bounds.
