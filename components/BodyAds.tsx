import Script from "next/script";

function BodyAds() {
  return (
    <>
      <Script
        type="application/javascript"
        id="show-bottom-ads">
        { `var ad_idzone = "4612238", ad_width = "300", ad_height = "250", v_pos = "bottom", h_pos = "center";` }
      </Script>
      <Script
        type="application/javascript"
        src="https://a.exdynsrv.com/js.php?t=17&idzone=4612238" />
      <Script
        type="application/javascript"
        data-idzone="4618274"
        data-ad_frequency_count="1"
        data-ad_frequency_period="5"
        data-type="mobile"
        data-browser_settings="1"
        data-ad_trigger_method="3"
        src="https://a.exdynsrv.com/fp-interstitial.js" />
      <Script
        type="application/javascript"
        data-idzone="4618272"
        data-ad_frequency_count="1"
        data-ad_frequency_period="720"
        data-type="desktop"
        data-browser_settings="1"
        data-ad_trigger_method="3"
        src="https://a.exdynsrv.com/fp-interstitial.js" />
    </>
  )
}

export default BodyAds;
