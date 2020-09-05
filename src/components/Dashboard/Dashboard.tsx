/* Libraries */
import React, { useEffect, useState } from 'react';
import { makeStyles, AppBar, Toolbar, TextField, Icon, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSelector as reduxUseSelector, TypedUseSelectorHook } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

/* Types */
import { State } from '../../type/Redux';

/* Application files */
import SourceUploader from '../SourceUploader';
import { formatDate, formatNumber, getDataSources, getCampaigns, filterByCampaign, filterByDataSource, totalMatchingValues } from './operations';

const useSelector = reduxUseSelector as TypedUseSelectorHook<State>;

const useStyles = makeStyles((theme) => ({
    appbar: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    button: {
        padding: `9px ${theme.spacing(2)}px`,
        minWidth: 'auto',
        marginRight: theme.spacing(1)
    },
    icon: {
        marginRight: 0
    },
    selectContainer: {
        width: 200,
        marginRight: theme.spacing(1),
        '& label': {
            padding: 3,
            marginTop: -15,
            marginLeft: 10,
            zIndex: 10,
            backgroundColor: '#ffffff',
            pointerEvents: 'none',
            '&.Mui-focused, &.MuiInputLabel-shrink': {
                marginTop: -10
            }
        }
    },
    selectElement: {
    },
    select: {
        padding: 10,
        paddingBottom: 11,
        paddingRight: 24,
        '&:focus': {
            backgroundColor: '#ffffff'
        }
    },
    graph: {
        margin: theme.spacing(2)
    },
    autocomplete: {
        width: '100%'
    }
}));

export function Dashboard () {
    const data = useSelector((state) => state.source.data);
    const [ filtered, setFiltered ] = useState([ ...(data || []) ]);
    const [ uploadOpen, setUploadOpen ] = useState(!data);
    const [ dataSources, setDataSources ] = useState('');
    const [ campaign, setCampaign ] = useState([] as string[]);
    const classes = useStyles();

    useEffect(() => {
        let newFiltered = [ ...(data || []) ];

        newFiltered = filterByCampaign(newFiltered, campaign);
        newFiltered = filterByDataSource(newFiltered, dataSources);
        newFiltered = totalMatchingValues(newFiltered);

        setFiltered(newFiltered);
    }, [ data, dataSources, campaign ]);

    function openUpload () {
        setUploadOpen(true);
    }

    function onUploadClose () {
        setUploadOpen(false);
    }

    function onCampaignChanged (e: React.ChangeEvent<unknown>, data: string[]) {
        setCampaign(data);
    }

    function onDataSourceChange (e: React.ChangeEvent<{ value: unknown; }>) {
        setDataSources(e.target.value as string);
    }

    return (
        <>
            <AppBar position="static" color="transparent" className={classes.appbar}>
                <Toolbar variant="dense">
                    <Button startIcon={<Icon>publish</Icon>} classes={{ startIcon: classes.icon, root: classes.button }} variant="outlined" onClick={openUpload} aria-label="Upload different file"></Button>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel htmlFor="data-source-filter">Data sources</InputLabel>
                        <Select id="data-source-filter" onChange={onDataSourceChange} variant="outlined" className={classes.selectElement} classes={{ root: classes.select }} defaultValue="">
                            <MenuItem value="">(all)</MenuItem>
                            {getDataSources(data || []).map((source, key) => (
                                <MenuItem value={source} key={key}>{source}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Autocomplete multiple options={getCampaigns(data || [])} className={classes.autocomplete} size="small" onChange={onCampaignChanged} renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Campaigns" placeholder="Campaigns" />
                    )} />
                </Toolbar>
            </AppBar>
            {data && (
                <LineChart width={window.innerWidth - 30} height={300} data={filtered} className={classes.graph}>
                    <Line type="monotone" dataKey="clicks" stroke="#f50057" yAxisId="left" dot={false} />
                    <Line type="monotone" dataKey="impressions" stroke="#2979ff" yAxisId="right" dot={false} />
                    <XAxis dataKey="date" dy={5} tickFormatter={formatDate} tick={{ fontSize: 11 }} />
                    <YAxis dataKey="clicks" yAxisId="left" label={{ value: 'Clicks', position: 'insideLeft', angle: -90, textAnchor: 'middle' }} tickFormatter={formatNumber} tick={{ fontSize: 11 }} />
                    <YAxis dataKey="impressions" yAxisId="right" orientation="right" label={{ value: 'Impressions', position: 'right', angle: -90, dx: -20 }} tickFormatter={formatNumber} tick={{ fontSize: 11 }} />
                    <CartesianGrid vertical={false} stroke="#ccc" />
                </LineChart>
            )}
            {uploadOpen && (
                <SourceUploader show={uploadOpen} onUpload={onUploadClose} onClose={onUploadClose} />
            )}
        </>
    );
}

export default Dashboard;
