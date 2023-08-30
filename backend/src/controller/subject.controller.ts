import { Request, Response } from "express"
import {Students_Teachers_Relation} from '../entities/Students_Teachers_Relation'
import {Subjects} from '../entities/Subjects'
import { IsNull, Not } from "typeorm";


export const getUserSubjects = async (req: Request, res: Response) => {
    const {user_id, role} = req.body;
    if(role === 1){
        const results = await Students_Teachers_Relation.findBy({ id_student: user_id })
        console.log(results)
        if (results.length > 0)
            return res.json({ status: 200, subjects: results });
    } else{
        const results = await Students_Teachers_Relation.findBy({ id_teacher: user_id })
        console.log(results)
        if (results.length > 0)
            return res.json({ status: 200, subjects: results });
    }
    
    console.log('devuelvo 300')
    return res.status(300).json({ message: 'User not found' });
};

export const getAllSubjects = async (req: Request, res: Response) => {
    return res.json(await Subjects.find());
};

export const saveStudentSubject = async (req: Request, res: Response) => {
    const {student_id, subject_id, role} = req.body;

    const relation = await Students_Teachers_Relation.findOneBy({id_subject: subject_id, id_teacher: Not(IsNull())})
    if (role === 1){
        const studentsSubject: Students_Teachers_Relation = new Students_Teachers_Relation()
        studentsSubject.id_student = student_id;
        if(relation)
            studentsSubject.id_teacher = relation.id_teacher;
        studentsSubject.id_subject = subject_id;

        try{
            await studentsSubject.save()
        } catch (err) {
            return res.status(300).json({ message: 'Error saving subject' });
        }
    } else {
        const relations = await Students_Teachers_Relation.findBy({id_subject: subject_id, id_teacher: IsNull()})
        if (relations.length > 0){
            for (const relation of relations){
                try{
                    await Students_Teachers_Relation.update({id: relation.id}, {id_teacher: student_id})
                } catch (err) {
                    console.log(err);
                    return res.status(300).json({ message: 'Error saving subject' });
                }
            }
        } else {
            const studentsSubject: Students_Teachers_Relation = new Students_Teachers_Relation()
            studentsSubject.id_teacher = student_id;
            studentsSubject.id_subject = subject_id;

            try{
                await studentsSubject.save()
            } catch (err) {
                return res.status(300).json({ message: 'Error saving subject' });
            }
        }
    }
    
    return res.status(204).send();
};

export const getSubjectName = async (req: Request, res: Response) => {
    const subject = await Subjects.findOneBy({id: parseInt(req.body.subject_id)})

    if (!subject) {
        return res.status(404).json({message : "User not found"}).send()
    }
    
    return res.json({ status: 204, subjectName: {name: subject.subject_name}}).send();
};
