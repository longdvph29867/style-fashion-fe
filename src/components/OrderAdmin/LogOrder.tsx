import { List } from 'antd';
import dayjs from 'dayjs';
import React from 'react'

type Log = {
    _id: string;
    action: string;
    timestamp: string;
};

type Props = {
    logs: Log[];
};

const LogOrder = ({ logs }: Props) => {
    return (
        <div>
            <div className='mt-2'>
                <h2 className='text-lg  font-semibold mb-4'>Nhật ký trạng thái đơn hàng</h2>
            </div>
            <List
                className='flex flex-col gap-2'
                itemLayout="horizontal"
                dataSource={logs}
                renderItem={(log) => (
                    <List.Item className="flex items-center pl-8 mb-4 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                        <List.Item.Meta
                            className='pl-12'
                            title={log?.action}
                            description={dayjs(log?.timestamp).format('DD/MM/YYYY HH:mm:ss')}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default LogOrder