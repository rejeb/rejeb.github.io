FROM ruby:3.3
LABEL authors="rbenrejeb"

RUN gem install -N jekyll jekyll-seo-tag jekyll-sitemap

WORKDIR /srv/site

EXPOSE 4000


CMD ["jekyll", "serve", "--host", "0.0.0.0", "-d", "/tmp/site", "--disable-disk-cache", "--force_polling"]
