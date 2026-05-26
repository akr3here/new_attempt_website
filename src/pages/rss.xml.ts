import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/config';
import { filterDrafts, sortByDate } from '../lib/utils';

export async function GET(context: { site: URL }) {
  const writings = sortByDate(filterDrafts(await getCollection('writings')));
  const logs = sortByDate(filterDrafts(await getCollection('logs')));

  const all = [...writings.map(w => ({
    title: w.data.title,
    description: w.data.description ?? '',
    pubDate: w.data.date,
    link: `/writings/${w.slug}/`,
  })), ...logs.map(l => ({
    title: l.data.title,
    description: '',
    pubDate: l.data.date,
    link: `/logs/${l.slug}/`,
  }))].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: all,
    customData: `<language>en-us</language>`,
  });
}
