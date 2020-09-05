/* Libraries */
import moment from 'moment';

/* Types */
import { SourceItem } from '../../type/Source';

export function formatNumber (number: number) {
    let suffix = '';

    if (number > 1000) { suffix = 'k'; number = Math.floor(number / 1000); }
    if (number > 1000) { suffix = 'm'; number = Math.floor(number / 1000); }

    return `${number}${suffix}`;
}

export function formatDate (d: string) {
    d = d.split('.').reverse().join('-');

    return moment(d).format('D. MMM.');
}

export function getDataSources (data: SourceItem[]): string[] {
    return (data || []).map((d) => d.datasource).reduce((all, current) => {
        if (!all.includes(current)) all.push(current);

        return all;
    }, []);
}

export function getCampaigns (data: SourceItem[]): string[] {
    return (data || []).map((d) => d.campaign).reduce((all, current) => {
        if (!all.includes(current)) all.push(current);

        return all;
    }, []);
}

export function filterByDataSource (data: SourceItem[], source: string): SourceItem[] {
    return data.filter((item) => source === '' ? true : item.datasource === source);
}

export function filterByCampaign (data: SourceItem[], campaigns: string[]): SourceItem[] {
    return data.filter((item) => campaigns.length === 0 ? true : campaigns.includes(item.campaign));
}

export function totalMatchingValues (data: SourceItem[]): SourceItem[] {
    return data.reduce((all: SourceItem[], current: SourceItem) => {
        const found = all.find((item) => item.date === current.date);

        if (found) {
            found.clicks += current.clicks;
            found.impressions += current.impressions;
        } else {
            all.push(current);
        }

        return all;
    }, []);
}
