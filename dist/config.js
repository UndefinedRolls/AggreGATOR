import fs from "fs";
import os from "os";
import path from "path";
export function setUser(userName) {
    const newConfig = readConfig();
    newConfig.currentUserName = userName;
    writeConfig(newConfig);
}
export function readConfig() {
    const new_path = getConfigFilePath();
    const cfg = fs.readFileSync(`${new_path}`, { encoding: 'utf-8' });
    return validateConfig(cfg);
}
function validateConfig(rawConfig) {
    let configVal = JSON.parse(rawConfig);
    try {
        const db = configVal.db_url;
        const username = configVal.current_user_name;
        return { dbUrl: db, currentUserName: username };
    }
    catch (e) {
        throw new Error(`Error Reading .gatorconfig.json`);
    }
}
function getConfigFilePath() {
    const homeDir = os.homedir();
    return path.join(homeDir, "/.gatorconfig.json");
}
function writeConfig(cfg) {
    const jsonTxt = JSON.stringify({ db_url: cfg.dbUrl, current_user_name: cfg.currentUserName });
    fs.writeFileSync(getConfigFilePath(), jsonTxt);
}
