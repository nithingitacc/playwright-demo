FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test"]
