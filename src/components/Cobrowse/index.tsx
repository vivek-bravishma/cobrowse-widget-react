import React from 'react';
import './style.css';
import CONFIG from '../../utils/config';
import CustomAgentUI from '../CustomAgent/CustomAgentUI';

// const api = 'https://cobrowse.io';
const api = 'https://cobrowse.io/dashboard';

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTI5MjE0MDk1MTEsImV4cCI6MTc0Nzk2NDk3OSwiYXVkIjoiaHR0cHM6Ly9jb2Jyb3dzZS5pbyIsImlzcyI6Img1VTlPNjFTMERHMDVRIiwic3ViIjoibmlraGlsZ0BicmF2aXNobWEuY29tIiwiZGlzcGxheU5hbWUiOiJOaWtoaWwgVmlzaHZhcyBHaG9ycGFkZSJ9.jItCm8OrkPkz_ciaNjatnjwRkJfBqa8EExzjhi99lbHh_-NZhuv4bk6jQrc5SgBNj61pA1idDO8JysxVlG_L-zSMXuYDy2N8QZ_1uJNpDJu-HWRGZ7vqE2ZDCSFEFCK1SyGuZv3MIDpaKoixxpDdEwxkQcbc5vkZaZ3uC37WerIaze2H3odhL6PJPRSYxZ6OvPK00eJk2s-N6tteCHerr49FwL4GNg39kzJ3xAXksse0NVDB2d-yveWomaLV54GsePhxn-2QWorHgW4iwElmDUBH1JcDk5xVyBDncHWvMY9reiawqF5hDLxN7rkLaLoSfRsH7BKl9O3h8XbshMXncZ3yROiz4hAI76RSM3KiTvr430iIq2VHTlWq0OS0QXUeaJ8ESgzgflxE9C-9J4gVhM5JY2SfWEfA6GL4XL-OMjlzsnq0ByJT8jzH9j9UdL9kSe86iu1QEszHeGU54RBD-mXGRkucGTRin8mqRzzctaddHOCA_mx6y5GWSH8wPSGZqQeli6MOqwW_5lxQZv97l5Zy40pI7rdaxmjkCU8sKm9SwwyForFXHg9UoXdFeXgOiy1q6LO0-cKF3ciWecvCSJc0Zn-lq8LqrMHhqQgIvDuml9E0Gw28Xd3rNfDUjMY_qTyfK0YagMLC32ZE4jT4nBnjowwsTJ7TSXArYy2tNyU`;

function Cobrowse() {
    // return <CustomAgentUI token={token} demoId={demoId} api={api} />;
    return <CustomAgentUI token={token} api={api} />;
}

export default Cobrowse;
