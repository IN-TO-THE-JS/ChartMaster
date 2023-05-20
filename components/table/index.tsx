import React from "react";
import styled from "styled-components";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
    IoIosAddCircle,
    IoIosRemoveCircle,
    IoIosArrowDropupCircle,
    IoIosArrowDropdownCircle,
} from "react-icons/io";

const Table = () => {
    const form = useFormContext();
    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control: form.control,
            name: "data",
        });

    const dataLength = fields.length;

    const handleClickAdd = () => {
        append({ name: "", data: "" });
    };
    const handleClickRemove = (index: number) => {
        remove(index);
    };
    const handleClickUp = (index: number) => {
        swap(index, index - 1);
    };
    const handleClickDown = (index: number) => {
        swap(index, index + 1);
    };

    return (
        <Wrapper>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledHeader>
                            <StyledHeaderInput
                                {...form.register("titleLabel")}
                            />
                        </StyledHeader>
                        <StyledHeader>
                            <StyledHeaderInput
                                {...form.register("dataLabel")}
                            />
                        </StyledHeader>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((item, index) => (
                        <tr key={index}>
                            <StyledCell>
                                <StyledInput
                                    {...form.register(`data.${index}.name`)}
                                />
                            </StyledCell>
                            <StyledCell>
                                <StyledInput
                                    {...form.register(`data.${index}.data`)}
                                />
                            </StyledCell>
                            <StyledCell>
                                <ButtonWrapper>
                                    {index === dataLength - 1 && (
                                        <Button onClick={handleClickAdd}>
                                            <IoIosAddCircle />
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => {
                                            handleClickRemove(index);
                                        }}
                                    >
                                        <IoIosRemoveCircle />
                                    </Button>
                                    {dataLength !== 1 && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    handleClickUp(index);
                                                }}
                                            >
                                                <IoIosArrowDropupCircle />
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    handleClickDown(index);
                                                }}
                                            >
                                                <IoIosArrowDropdownCircle />
                                            </Button>
                                        </>
                                    )}
                                </ButtonWrapper>
                            </StyledCell>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </Wrapper>
    );
};

export default Table;

const Wrapper = styled.div``;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const StyledHeader = styled.th`
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`;

const StyledCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const StyledHeaderInput = styled.input`
    border: none;
    background-color: #f5f5f5;
    font-size: 16px;
`;

const StyledInput = styled.input`
    border: none;
    background-color: #fff;
`;

const ButtonWrapper = styled.div`
    display: flex;
`;

const Button = styled.div`
    cursor: pointer;
`;
