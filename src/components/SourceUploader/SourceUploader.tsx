/* Libraries */
import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button, IconButton, Icon, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useDispatch as reduxUseDispatch } from 'react-redux';

/* Types */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../type/Redux';

/* Application files */
import LoadingOverlay from '../LoadingOverlay';
import { parseSourceFile } from '../../actions/source';

type Props = {
    show: boolean;
    onUpload?: () => void;
    onClose?: () => void;
}

const useDispatch = () => reduxUseDispatch<ThunkDispatch<State, any, Action>>();

const useStyle = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        padding: theme.spacing(1)
    },
    uploader: {
        display: 'none'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    error: {
        color: red[500]
    },
    fileName: {
        marginBottom: theme.spacing(1)
    }
}));

export function SourceUploader (props: Props) {
    const classes = useStyle();
    const elementInput = useRef<HTMLInputElement>();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ file, setFile ] = useState(null);

    function onClose () {
        elementInput.current.value = null;

        props.onClose();
    }

    function upload () {
        setLoading(true);
        setError(null);

        const reader = new FileReader();

        reader.onload = async () => {
            try {
                await dispatch(parseSourceFile(reader.result as string));
                setLoading(false);
                props.onUpload && props.onUpload();
            } catch (error) {
                setError(error.message);
            }
        };

        reader.readAsText(elementInput.current.files[0]);
    }

    function selectFile (e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files[0]);
    }

    function triggerSelectFile () {
        elementInput.current.click();
    }

    return (
        <Dialog onClose={onClose} open={props.show} role="dialog">
            <DialogTitle disableTypography id="csv-upload-dialog-title" className={classes.header}>
                <Typography variant="h5" className={classes.title}>Upload source data CSV</Typography>
                <IconButton onClick={onClose} aria-label="Close upload dialog">
                    <Icon>close</Icon>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.container}>
                <input type="file" name="upload-file" id="upload-file" className={classes.uploader} ref={elementInput} accept=".csv" onChange={selectFile} />
                {!error && <span className={classes.fileName}>{file && file.name}</span>}
                {error && <span className={classes.error}>{error}</span>}
                <Button color="primary" startIcon={<Icon>add</Icon>} onClick={triggerSelectFile} aria-label={`${file ? 'Change' : 'Select'} file`}>
                    {file ? 'Change' : 'Select'} file
                </Button>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={upload} color="primary" variant="contained">Upload</Button>
            </DialogActions>
            {loading && <LoadingOverlay />}
        </Dialog>
    );
}

export default SourceUploader;
