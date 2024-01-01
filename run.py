import os
import requests
import time

while 1:
    try:
        resp = requests.get('https://mempool.space/api/v1/fees/recommended', timeout=10)
        # fee = resp.json()['halfHourFee']  # 稳扎稳打
        # fee = resp.json()['hourFee']
        fee = resp.json()['fastestFee']  # 已经疯了
    except Exception as e:
        fee = 140
    fee = min([fee, 240])
    cmd = 'yarn cli mint-dft quark --satsbyte {fee} --disablechalk --rbf '.format(fee=fee)
    print(cmd)
    os.system(cmd)
