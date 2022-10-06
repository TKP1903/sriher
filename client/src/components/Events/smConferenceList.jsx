import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const SmConferenceList = ({events}) => {
    var idCount = 1;
  return (
    <div>
      <Table>
        <Thead>
          <Tr className="text-sm">
            <Th>ID</Th>
            <Th>NAME</Th>
            <Th>VENUE</Th>
            <Th>START DATE</Th>
            <Th>END DATE</Th>
            <Th>CONFERENCE LINK</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events?.length > 0 ? (
            events?.map((row) => (
              <Tr key={row.eventName} className="text-sm">
                <Td>{idCount++}</Td>
                <Td>{row.eventName}</Td>
                <Td>{row.venue}</Td>
                <Td>{row.event_end_data}</Td>
                <Td>{row.event_link}</Td>
              </Tr>
            ))
          ) : (
            <></>
          )}
        </Tbody>
      </Table>
    </div>
  );
}

export default SmConferenceList