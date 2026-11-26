# VK Physiotherapy Clinic website

Static site (HTML, CSS, vanilla JavaScript). No build step, no backend, no paid services.

```
index.html
css/style.css
js/script.js
assets/
  dr-dharmateja.jpg     doctor photo (hero and About)
  sunday-offer.jpg      Sunday promotion poster (Special Offers)
  clinic-services.jpg   clinic poster (Services)
```

All paths are relative, so the site works at `username.github.io/` and at `username.github.io/repo-name/`.

## Images
The three images are already optimized and placed in `assets/`. To replace one, save the new file with the same name (keep `.jpg`) in `assets/`.

## Edit the Sunday offer
Open `js/script.js` and change the `CONFIG.offer` block at the top. Set `enabled: false` to hide the offer bar, menu link, offer section and footer link. To also change the poster, replace `assets/sunday-offer.jpg`.

## Deploy on GitHub Pages
1. Create a GitHub account and click **New repository**. Name it (for example `vk-physio`), set it to **Public**, and create it.
2. Click **uploading an existing file**, drag in `index.html`, `README.md`, and the `css`, `js` and `assets` folders (keep the folder structure), then **Commit changes**.
3. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then **Save**.
4. Wait one to two minutes. Your site appears at `https://USERNAME.github.io/REPOSITORY/`.

Using Git instead:
```
git init && git add . && git commit -m "VK Physiotherapy site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

## Notes
- The contact form does not store data. It opens a prefilled WhatsApp message to 9515977522.
- The map searches for Venkatachalam Toll Plaza. For an exact pin, open the clinic in Google Maps, choose **Share > Embed a map**, and replace the iframe `src` in `index.html`.
- Update the page title and description in `index.html` if the clinic details change.
