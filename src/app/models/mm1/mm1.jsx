import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import * as css from './mm1.module.css';
import Table from '../../table';
import { TIME } from '../../../helpers/enums';
import React, { useState } from 'react';
import timeConverter from '../../../helpers/time-converter';

const MM1 = () => {
  const [lambdaComboValue, setLambdaComboValue] = useState(TIME.Hours);
  const [muComboValue, setMuComboValue] = useState(TIME.Hours);
  const [lambdaValue, setLambdaInputValue] = useState(20);
  const [muValue, setMuInputValue] = useState(60);
  const [pnValue, setPnInputValue] = useState(0);
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
    Pn: {
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
      case 'inputLambda':
        setLambdaInputValue(e.target.value);
        return;
      case 'inputPn':
        setPnInputValue(e.target.value);
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
    const P0 = (1 - (lambdaH / muH));
    const Ls = (lambdaH / (muH - lambdaH));
    const Lq = (Math.pow(lambdaH, 2) / (muH * (muH - lambdaH)));
    const Ws = (1 / (muH - lambdaH));
    const Wq = ((lambdaH) / (muH * (muH - lambdaH)));
    const Pn = Math.pow((lambdaH / muH), (parseFloat(pnValue, 10) + 1));
    const P = (lambdaH / muH);

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
      Pn: {
        percentage: Pn,
      },
      P: {
        percentage: P,
      },
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
            type="number"
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
            type="number"
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
        <InputLabel>Pn</InputLabel>
        <TextField
          type="number"
          onChange={(e) => handleChange(e, 'inputPn')}
          value={pnValue}
        />
        <Button className={css.button} onClick={calculateResults}>Calculate</Button>
      </div>
      <div className={css.results}>
        <InputLabel className={css.resultsLabel}>Results</InputLabel>
        <Table rows={Object.entries(result)} />
      </div>
    </div>
  );
}

export default MM1;