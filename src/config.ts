import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(userName:string):void {
    const newConfig:Config = readConfig();
    newConfig.currentUserName = userName;
    writeConfig(newConfig);
}

export function readConfig(): Config{
    const new_path = getConfigFilePath();
    const cfg = fs.readFileSync(`${new_path}`, {encoding:'utf-8'});
    return validateConfig(cfg);
}

function validateConfig(rawConfig:any):Config{
    let configVal = JSON.parse(rawConfig);
    try {
        const db: string = configVal.db_url;
        const username: string = configVal.current_user_name;
        return {dbUrl: db, currentUserName: username};
    }
    catch (e){
        throw new Error (`Error Reading .gatorconfig.json`)
    }
}

function getConfigFilePath():string{
    const homeDir:string = os.homedir();
    return path.join(homeDir, "/.gatorconfig.json");
}

function writeConfig(cfg: Config): void{
    const jsonTxt = JSON.stringify({db_url:cfg.dbUrl, current_user_name:cfg.currentUserName});
    fs.writeFileSync(getConfigFilePath(), jsonTxt)
}