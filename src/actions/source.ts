/* Types */
import { ReduxThunkAction, ReduxActionType } from '../type/Redux';
import { SourceItem } from '../type/Source';

export function parseSourceFile (content: string): ReduxThunkAction<SourceItem[]> {
    return async (dispatch) => {
        const controller = URL.createObjectURL(new Blob([ parser.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '') ], { type: 'text/javascript' }));
        const worker = new Worker(controller);

        return new Promise((resolve, reject) => {
            worker.onmessage = (e: MessageEvent) => {
                dispatch({
                    type: ReduxActionType.SOURCE_SET_DATA,
                    data: e.data
                });

                return resolve(e.data);
            };

            worker.onerror = (e: ErrorEvent) => {
                return reject(e);
            };

            worker.postMessage(content);
        });
    };
}

function parser () {
    self.onmessage = (e: MessageEvent) => {
        const lines = (e.data as string).split('\n').slice(1);
        const parsed = lines.map((line) => {
            const item = line.split(',');

            return {
                date: item[0],
                datasource: item[1],
                campaign: item[2],
                clicks: parseInt(item[3], 10) || 0,
                impressions: parseInt(item[4], 10) || 0
            } as SourceItem;
        });

        parsed.splice(-1, 1);

        self.postMessage(parsed);
        self.close();
    };
}
