const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  hero: [
    {
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
      name: 'hero-1.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1586443116911-c19cb315ab89',
      name: 'hero-2.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1',
      name: 'hero-3.jpg'
    }
  ],
  products: [
    {
      url: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c',
      name: 'vegetables.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e',
      name: 'fruits.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38',
      name: 'honey.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05',
      name: 'eggs.jpg'
    }
  ],
  activities: [
    {
      url: 'https://images.unsplash.com/photo-1500076656116-558758c991c1',
      name: 'farm-tour.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e',
      name: 'greenhouse.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2',
      name: 'harvest.jpg'
    }
  ],
  research: [
    {
      url: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6',
      name: 'hydroponics.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b',
      name: 'crops.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282',
      name: 'tech.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1588656767193-ed8e59ebc54f',
      name: 'machines.jpg'
    }
  ]
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800`;
    https.get(fullUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  const baseDir = path.join(__dirname, '..', 'public', 'images');

  // Ensure directories exist
  for (const category of Object.keys(images)) {
    const dir = path.join(baseDir, category);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Download all images
  for (const [category, categoryImages] of Object.entries(images)) {
    for (const image of categoryImages) {
      const filepath = path.join(baseDir, category, image.name);
      try {
        await downloadImage(image.url, filepath);
      } catch (error) {
        console.error(`Error downloading ${image.name}:`, error.message);
      }
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch(console.error);
