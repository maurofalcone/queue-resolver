import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import * as css from './mg1.module.css';
import Table from '../../table';
import { TIME } from '../../../helpers/enums';
import React, { useState } from 'react';
import timeConverter from '../../../helpers/time-converter';

const MG1 = () => {
  const [lambdaComboValue, setLambdaComboValue] = useState(TIME.Hours);
  const [muComboValue, setMuComboValue] = useState(TIME.Hours);
  const [sigmaComboValue, setSigmaComboValue] = useState(TIME.Hours);
  const [lambdaValue, setLambdaInputValue] = useState(20);
  const [muValue, setMuInputValue] = useState(60);
  const [sigmaValue, setSigmaInputValue] = useState(undefined);
  const [result, setResult] = useState({
    P0: {
      percentage: '-',
    },
    Ls: {
      quantity: '-',
    },
    Lq: {
      quantity: '-',
    },
    Ws: {
      hours: '-',
    },
    Wq: {
      hours: '-',
    },
    Pw: {
      percentage: '-',
    },
    P: {
      percentage: '-',
    },
  });

  const handleChange = (e, type) => {
    e.preventDefault();
    switch (type) {
      case 'comboLambda':
        setLambdaComboValue(e.target.value);
        return;
      case 'comboMu':
        setMuComboValue(e.target.value);
        return;
      case 'comboSigma':
        setSigmaComboValue(e.target.value);
        return;
      case 'inputLambda':
        setLambdaInputValue(e.target.value);
        return;
      case 'inputSigma':
        setSigmaInputValue(e.target.value);
        return;
      default:
        setMuInputValue(e.target.value);
        return;
    }
  }

  const options = [TIME.Hours, TIME.Minutes, TIME.Seconds];

  const renderOptions = () => (
    options.map((option) => (
      <MenuItem key={option} value={option}>{option}</MenuItem>
    ))
  )

  const calculateResults = (e) => {
    e.preventDefault();
    let lambdaH;
    let muH;
    let sigmaH;
    switch (lambdaComboValue) {
      case TIME.Minutes:
        lambdaH = timeConverter.minutesToHours(lambdaValue);
        break;
      case TIME.Seconds:
        lambdaH = timeConverter.secondsToHours(lambdaValue);
        break;
      default:
        lambdaH = lambdaValue;
        break;
    }
    switch (muComboValue) {
      case TIME.Minutes:
        muH = timeConverter.minutesToHours(muValue);
        break;
      case TIME.Seconds:
        muH = timeConverter.secondsToHours(muValue);
        break;
      default:
        muH = muValue;
        break;
    }
    switch (sigmaComboValue) {
      case TIME.Minutes:
        sigmaH = timeConverter.minutesToHours(sigmaValue);
        break;
      case TIME.Seconds:
        sigmaH = timeConverter.secondsToHours(sigmaValue);
        break;
      default:
        sigmaH = sigmaValue;
        break;
    }
    const P = (lambdaH / muH);
    const P0 = (1 - (lambdaH / muH));
    const aux1 = (Math.pow(lambdaH, 2) * Math.pow(sigmaH, 2)) + Math.pow(P, 2);
    const aux2 = (2 * (1 - P));
    const Lq = (aux1 / aux2);
    const Ls = (Lq + P);
    const Wq = (Lq / lambdaH);
    const Ws = (Wq + (1 / muH));

    const result = {
      P0: {
        percentage: P0,
      },
      Ls: {
        quantity: Ls,
      },
      Lq: {
        quantity: Lq,
      },
      Ws: {
        hours: Ws,
      },
      Wq: {
        hours: Wq,
      },
      Pw: {
        percentage: P,
      },
      P: {
        percentage: P,
      }
    }
    setResult(result);
  }

  return (
    <div className={css.container}>
      <div className={css.inputsContainer}>
        <InputLabel>Data</InputLabel>
        <div className={css.group}>
          <InputLabel>λ</InputLabel>
          <TextField
            onChange={(e) => handleChange(e, 'inputLambda')}
            value={lambdaValue}
          />
          <InputLabel>Time</InputLabel>
          <Select
            className={css.select}
            value={lambdaComboValue}
            onChange={(e) => handleChange(e, 'comboLambda')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {renderOptions()}
          </Select>
        </div>
        <br/>
        <div className={css.group}>
          <InputLabel>µ</InputLabel>
          <TextField
            onChange={(e) => handleChange(e, 'inputMu')}
            value={muValue}
          />
          <InputLabel>Time</InputLabel>
          <Select
            className={css.select}
            value={muComboValue}
            onChange={(e) => handleChange(e, 'comboMu')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {renderOptions()}
          </Select>
        </div>
        <br/>
        <div className={css.group}>
          <InputLabel>σ</InputLabel>
          <TextField
            onChange={(e) => handleChange(e, 'inputSigma')}
            value={sigmaValue}
            required
          />
          <InputLabel>Time</InputLabel>
          <Select
            name={'Sigma'}
            className={css.select}
            value={sigmaComboValue}
            onChange={(e) => handleChange(e, 'comboSigma')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {renderOptions()}
          </Select>
        </div>
        <Button className={css.button} onClick={calculateResults}>Calculate</Button>
      </div>
      <div className={css.results}>
        <InputLabel className={css.resultsLabel}>Results</InputLabel>
        <Table rows={Object.entries(result)} />
      </div>
    </div>
  );
}

export default MG1;