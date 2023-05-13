import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useTable } from "react-table";
import styled from "styled-components";

interface ColumnDetails {
    [key: string]: string;
}

type ViewType = "preview" | "data";

const MODE_LABEL = ["preview", "data"];

const TestPage = () => {
    const [mode, setMode] = useState<ViewType>("preview");

    const {
        getValues,
        watch,
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "rows",
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Age", accessor: "age" },
            { Header: "Actions", accessor: "actions" },
        ],
        []
    );

    const data: ColumnDetails[] = React.useMemo(() => fields, [fields]);

    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    watch("title");

    const handleClickModeButton = (
        label: ViewType,
        e: React.SyntheticEvent
    ) => {
        e.preventDefault();
        setMode(label);
    };

    return (
        <form>
            <Wrapper>
                <HeaderSection>
                    <TitleInputLabel>제목</TitleInputLabel>
                    {/* <TitleInput
                        placeholder="제목을 입력하세요"
                        {...register("title")}
                    /> */}

                    <ModelWrapper>
                        {MODE_LABEL.map((label: ViewType) => {
                            return (
                                <ModeLabel
                                    key={label}
                                    onClick={(e: React.SyntheticEvent) => {
                                        handleClickModeButton(label, e);
                                    }}
                                >
                                    {label}
                                </ModeLabel>
                            );
                        })}
                    </ModelWrapper>
                </HeaderSection>
                <ContentSection>
                    <ContentInnerLeftWrapper>{mode}</ContentInnerLeftWrapper>
                    <ContentInnerRightWrapper>
                        {/* TODO: 사이드바 세팅  */}
                        사이드바 세팅이 들아갈 예정입니다.
                    </ContentInnerRightWrapper>
                </ContentSection>
                <FooterSection></FooterSection>
            </Wrapper>
        </form>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <table {...getTableProps()} style={{ border: "1px solid black" }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                <td>
                                    <input
                                        {...register(`rows.${index}.name`, {
                                            required: true,
                                        })}
                                        defaultValue={row.original.name}
                                    />
                                    {errors.rows &&
                                        errors.rows[index]?.name && (
                                            <span>This field is required</span>
                                        )}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        {...register(`rows.${index}.age`, {
                                            required: true,
                                        })}
                                        defaultValue={row.original.age}
                                    />
                                    {errors.rows && errors.rows[index]?.age && (
                                        <span>This field is required</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button type="button" onClick={() => append({ name: "", age: "" })}>
                Add Row
            </button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TestPage;

const Wrapper = styled.div``;

const HeaderSection = styled.div`
    height: 60px;
`;

const TitleInput = styled.input``;

const TitleInputLabel = styled.div``;

const ModelWrapper = styled.div``;
const ModeLabel = styled.button``;

const ContentSection = styled.div`
    display: flex;
    background-color: red;
    height: calc(100vh - 60px);
`;

const ContentInnerLeftWrapper = styled.div`
    flex: 7;
    background-color: yellow;
`;

const ContentInnerRightWrapper = styled.div`
    flex: 3;
    background-color: green;
`;

const FooterSection = styled.div``;
